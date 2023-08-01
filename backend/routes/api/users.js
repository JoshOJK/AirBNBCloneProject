const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models')
const { Review } = require('../../db/models')
const { ReviewImage } = require('../../db/models')
const { SpotImage } = require('../../db/models')
const { Booking } = require('../../db/models')
const sequelize = require('sequelize')


const validateSignup = [
  check('email')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid email.'),
  check('username')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a username with at least 4 characters.'),
  check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a firstName'),
  check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a lastName'),
  check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, firstName, lastName,hashedPassword });

      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );


  router.get('/:userId/spots', async (req, res, next) => {
    let userId = req.params.userId

    let spots = await Spot.findAll({
        where: {
            ownerId: userId
        },
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
      group: ["Spot.id"],
    })
    for (const spot of spots) {
      const previewImage = await SpotImage.findOne({
          attributes: ['url'],
          where: { spotId: spot.id, preview: true },
      });
      if (previewImage) {
          spot.dataValues.previewImage = previewImage.dataValues.url;
      }
    if(spots) {
      res.json({Spot:spots})
  } else {
      res.status(403).json
  }

}
})

router.get('/:userId/reviews', requireAuth, async (req, res, next) => {
  let userId = req.params.userId
  const reviews = await Review.findAll({
    where: {
      userId: userId
    },
    include: [
      {
        model: User,
        attributes: [
        "id",
        "firstName",
        "lastName"
        ]
    },
      {
      model: Spot,
      attributes:[
      "id",
      "ownerId",
      "address",
      "city",
      "state",
      "country",
      "lat",
      "lng",
      "name",
      "price",
    ]
      },
      {
        model: ReviewImage,
        attributes: [
          "id",
          "url"
        ]
      }
    ]
  })

  for (const review of reviews) {
    const spot = review.Spot;
    const previewImage = await SpotImage.findOne({
      attributes: ["url"],
      where: { spotId: spot.id, preview: true },
    });
    if (previewImage) {
      spot.dataValues.previewImage = previewImage.url;
    }
  }

  return res.json({Reviews: reviews})
})

router.get('/:userId/bookings', requireAuth, async (req, res, next) => {
  let user = req.user;

  let bookings = await Booking.findAll({
    where: {
      userId: user.id
    },
    include: [
      {
        model: Spot,
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
        "price",

        ]
      }
    ]

  })

  for (const booking of bookings) {
      const spot = booking.Spot
      const previewImage = await SpotImage.findOne({
          attributes: ['url'],
          where: { spotId: spot.id, preview: true },
      });
      if (previewImage) {
          spot.dataValues.previewImage = previewImage.url;
      }
}
res.json({Bookings: bookings})
})



module.exports = router;
