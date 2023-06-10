const express = require('express')
const router = express.Router();

const { Op } = require('sequelize');
const { Spot } = require('../../db/models')
const { User } = require('../../db/models')

router.get('/spots', async (req, res, next) => {
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




module.exports = router;
