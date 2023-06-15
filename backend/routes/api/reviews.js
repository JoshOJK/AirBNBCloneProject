const express = require('express')
const router = express.Router();

const sequelize = require('sequelize')
const { Op } = require('sequelize');
const { Spot } = require('../../db/models')
const { User } = require('../../db/models')
const { SpotImage } = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models')
const { ReviewImage } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isFloat({min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];


router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { url } = req.body;
    const reviewId = req.params.reviewId
    const user = req.user
    const review = await Review.findByPk(reviewId)
    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    })
console.log(reviewImages)
if (review){
    if(user.id === review.userId) {
        if(reviewImages.length < 10) {
           const createdReviewImage =  await ReviewImage.create({
                reviewId: parseInt(reviewId),
                url: url
           })
           const response = {
            id: createdReviewImage.id,
            url: createdReviewImage.url
           }
           return res.json(response)
        } else return res.status(403).json({message: "Maximum number of images for this resource was reached"})
    } else return res.status(403).json("Forbidden")
} else return res.status(404).json({message: "Review couldn't be found"})
})


router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const user = req.user
    const { review, stars } = req.body;
    const reviewId = req.params.reviewId;

    const currReview = await Review.findByPk(reviewId)

    if(currReview) {
        if(user.id === currReview.userId) {
            currReview.review = review,
            currReview.stars = stars
            await currReview.save()
            return res.json(currReview)
        } else res.status(403).json({message: "Forbidden"})
    } else res.status(404).json({message: "Review couldn't be found"})

})

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const user = req.user;
    const reviewId = req.params.reviewId;

    const currReview = await Review.findByPk(reviewId)

    if(currReview) {
        if(user.id === currReview.userId) {
           await currReview.destroy()
           return res.json({message: "Successfully deleted"})
        } else res.status(403).json({message: "Forbidden"})
    } else res.status(404).json({message: "Review couldn't be found"})
})


router.delete('/:reviewId/images/:imageId', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const imageId = req.params.imageId

    const review = await Review.findByPk(reviewId);
    const reviewImage = await ReviewImage.findByPk(imageId);

    if (!reviewImage) {
        return res.status(404).json({ message: "Review Image couldn't be found" })
    }

    if (review.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" })
    };

    await reviewImage.destroy()
    return res.status(200).json({ message: "Successfully deleted" })
});

module.exports = router;
