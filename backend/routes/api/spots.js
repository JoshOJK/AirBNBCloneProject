const express = require('express')
const router = express.Router();

const { Op } = require('sequelize');
const { Spot } = require('../../db/models')
const { User } = require('../../db/models')
const { SpotImage } = require('../../db/models')

router.get('/', async (req, res, next) => {
    let spots = await Spot.findAll()

    res.json(spots)
})

router.get('/users/:userId/spots', async (req, res, next) => {
    let userId = req.params.userId

    let spot = await Spot.findAll({
        where: {
            ownerId: userId
        }
    })
    res.json(spot)
})

router.get('/:spotId', async (req, res, next) => {
    let ownerId = req.params.spotId

    let spot = await Spot.findAll({
        where: {
            ownerId: ownerId
        },
        include:[{
            model:SpotImage
        }]
    })

    res.json(spot)
})

router.post('/', async (res, req, next) => {
    const { adress, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.create({adress, city, state, country, lat, lng, name, description, price})

    return res.json(spot)
})



module.exports = router;
