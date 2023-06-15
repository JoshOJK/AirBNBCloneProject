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
const { Booking } = require('../../db/models')

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

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


router.get('/', async (req, res) => {
    let { page, size } = req.query;

    if(!page) page = 1;
    if(!size) size = 20;
    if(page > 10) size = 1;
    if(size > 20) size = 20;
    page = parseInt(page)
    size = parseInt(size)
    let pag = {}

    if(page !== 0 && size !== 0) {
        pag.limit = size
        pag.offset = size * (page - 1)
    }


    let results = {};
    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: []
            }
        ],
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price',
            'createdAt',
            'updatedAt',
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
        ],
        group: ['Spot.Id'],



    });

    for (const spot of spots) {
        const previewImage = await SpotImage.findOne({
            attributes: ['url'],
            where: { spotId: spot.id, preview: true },
        });
        if (previewImage) {
            spot.dataValues.previewImage = previewImage.dataValues.url;
        }
    };

    results.Spots = spots;
    res.status(200).json({
        Spots: spots,
        page: page,
        size: size
    })

});



router.get('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;

    const spot = await Spot.findOne({
        where: {
            id: spotId,
        },
        include: [
            {
                model: Review,
                attributes: [],
            },
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"],
            },
            {
                model: User,
                as: "Owner",
                attributes: ["id", "firstName", "lastName"],
            },
        ],
        attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "description",
            "price",
            "createdAt",
            "updatedAt",
            [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
            [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
        ],
        group: ["Spot.id", "Owner.id", "SpotImages.id"],
    });

    if (spot) {
        const response = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            numReviews: spot.getDataValue("numReviews"),
            avgStarRating: spot.getDataValue("avgStarRating"),
            SpotImages: spot.SpotImages,
            Owner: spot.Owner,
        };

        return res.status(200).json(response);
    } else {
        return res.json({ message: "Spot couldn't be found" });
    }
})

router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const ownerId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price })


    let safeSpot = {
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price
    }



    return res.json(safeSpot)
})


router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { url, preview } = req.body;
    const user = req.user;
    const spotId = req.params.spotId;

    const currentSpot = await Spot.findByPk(spotId);

    if (currentSpot) {
        if (user.id === currentSpot.ownerId) {
            const spotImage = await SpotImage.create({
                url: url,
                preview: preview
            })
            currentSpot.addSpotImage(spotImage)
            return res.json(spotImage)
        } else return res.status(403).json("Forbiden")
    } else return res.status(404).json({message:"Spot couldn't be found"})

})

router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const user = req.user;
    const spotId = req.params.spotId;
    const { address, city, state, country, lat, lng, name, description, price } = req.body


    const currentSpot = await Spot.findByPk(spotId)

    if (currentSpot) {
        if (user.id === currentSpot.ownerId) {
            currentSpot.address = address,
                currentSpot.city = city,
                currentSpot.state = state,
                currentSpot.country = country,
                currentSpot.lat = lat,
                currentSpot.lng = lng,
                currentSpot.name = name,
                currentSpot.description = description,
                currentSpot.price = price
            await currentSpot.save()
            res.status(200)
            return res.json(currentSpot)
        } else return res.status(403).json("Forbiden")
    } else return res.status(404).json({message:"Spot couldn't be found"})
})

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const user = req.user;
    const spotId = req.params.spotId;

    const currentSpot = await Spot.findByPk(spotId)

    if (currentSpot) {
        if (user.id === currentSpot.ownerId) {
            await currentSpot.destroy()
            return res.status(200).json('Successfully deleted')
        } else return res.status(403).json("Forbiden")
    } else return res.status(404).json({message:"Spot couldn't be found"})
})


router.get('/:spotId/reviews', async (req, res, next) => {
    let spotId = req.params.spotId

    const reviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [{
            model: User,
            attributes: ["id","firstName","lastName"]
        },
        {model: ReviewImage,
            attributes: ["id","url"]
        }
    ]
    })

    if(reviews.length) return res.json(reviews)
    else return res.status(404).json({message:"Spot couldn't be found"})

})

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { review, stars} = req.body;
    const userId = req.user.id;



    const spot = await Spot.findByPk(spotId)
    const userReviews = await Review.findOne({
        where: {
            userId: userId,
            spotId: spotId
        }
    })

    if(spot){
        if(!userReviews) {
            const newReview = await Review.create({userId, spotId, review, stars})
            return res.json(newReview)
        } else return res.status(500).json({message: "User already has a review for this spot"})
    }else return res.status(404).json({message:"Spot couldn't be found"})


})
//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    let user = req.user;
    let spotId = req.params.spotId
    let spot = await Spot.findByPk(spotId)


if(spot){
    if(user.id === spot.ownerId) {
        const booking = await Booking.findAll({
            where: {
                spotId: spotId
            },
            include: [
                {
                    model: User,
                    attributes: ["id",
                    "firstName",
                    "lastName"]
                }
            ]
        })
        return res.json(booking)
    } else {
        const noAuthBooking = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: ["spotId",
            "startDate",
            "endDate"]
        })
        return res.json(noAuthBooking)
    }
} return res.status(404).json({message: "Spot couldn't be found"})
})
//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    let userId = req.user.id;
    let spotId = parseInt(req.params.spotId);
    let spot = await Spot.findByPk(spotId)
    const { startDate, endDate } = req.body;

    let bookingStartDate = new Date(startDate)
    let bookingEndDate = new Date(endDate)

    if((bookingEndDate <= bookingStartDate)) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
              endDate: "endDate cannot be on or before startDate"
            }
          })
    }
    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
          })
    }
    if(spot.ownerId === userId){
        return res.status(403).json({message: 'Forbidden'})
    }

      const allBookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
      })


      let bookedEndDate;
      let bookedStartDate;

      for(let booking of allBookings) {
        bookedStartDate = new Date(booking.startDate)
        bookedEndDate = new Date(booking.endDate)

        if((bookingStartDate <= bookedEndDate) && (bookingStartDate >= bookedStartDate) && (bookingEndDate <= bookedEndDate) && (bookingEndDate >= bookedStartDate)) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    endDate: "End date conflicts with an existing booking",
                    startDate: "Start date conflicts with an existing booking"
                }
              });
        } else if((bookingStartDate <= bookedEndDate) && (bookedStartDate >= bookedStartDate)) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                  startDate: "Start date conflicts with an existing booking",
                }
              });
        } else if ((bookingEndDate <= bookedStartDate) && (bookedEndDate >= bookedStartDate)) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    endDate: "End date conflicts with an existing booking"
                }
              });
        } else if (bookingStartDate < bookedStartDate && bookingEndDate > bookedEndDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    endDate: "End date conflicts with an existing booking",
                    startDate: "Start date conflicts with an existing booking"
                }
              });
        }
      }

      let booking = await Booking.create({
            spotId, userId, startDate, endDate

      })
      res.json(booking)
})


router.delete('/:spotId/images/:imageId', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    const imageId = req.params.imageId

    const spot = await Spot.findByPk(spotId);
    const spotImage = await SpotImage.findByPk(imageId);

    if (!spotImage) {
        return res.status(404).json({
            message: "Spot Image couldn't be found"
        })
    }

    if (spot.ownerId !== userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    };

    await spotImage.destroy()
    return res.status(200).json({
        message: "Successfully deleted"
    })
});


module.exports = router;
