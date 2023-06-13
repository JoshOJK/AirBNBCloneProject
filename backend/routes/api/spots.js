const express = require('express')
const router = express.Router();

const { Op } = require('sequelize');
const { Spot } = require('../../db/models')
const { User } = require('../../db/models')
const { SpotImage } = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');

router.get('/', async (req, res, next) => {
    let spots = await Spot.findAll()

    res.json(spots)
})



router.get('/:spotId', requireAuth, async (req, res, next) => {
    let ownerId = req.params.spotId


    let spot = await Spot.findAll({
        where: {
            ownerId: ownerId
        },
        include:[{
            model:SpotImage
        }]
    })

    if(spot) {
        res.json(spot)
    } else return res.status(404).json('Spot couldnt be found');



})

router.post('/', requireAuth, async (req, res,  next) => {
    const ownerId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.create({ownerId, address, city, state, country, lat, lng, name, description, price})


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

    if(currentSpot) {
        if(user.id === currentSpot.ownerId) {
            const spotImage = await SpotImage.create({
                url: url,
                preview: preview
            })
            currentSpot.addSpotImage(spotImage)
            return res.json(spotImage)
        } else return res.status(403).json("Forbiden")
    } else return res.status(404).json("Spot couldn't be found")

})

router.put('/:spotId', requireAuth, async (req, res, next) => {
    const user = req.user;
    const spotId = req.params.spotId;
    const { address, city, state, country, lat, lng, name, description, price } = req.body


    const currentSpot = await Spot.findByPk(spotId)

    if(currentSpot) {
        if(user.id === currentSpot.ownerId) {
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
    } else return res.status(404).json("Spot couldn't be found")
})

router.delete('/:spotId' , requireAuth, async (req, res, next) => {
    const user = req.user;
    const spotId = req.params.spotId;

    const currentSpot = await Spot.findByPk(spotId)
    console.log(user.id, currentSpot.ownerId)
    if(currentSpot) {
        if(user.id === currentSpot.ownerId) {
            await currentSpot.destroy()
            console.log('%*#%)$Y%^$^*)$^)*($^$*^&$(^&$()*^&($')
          return res.status(200).json('Successfully deleted')
        } else return res.status(403).json("Forbiden")
    } else return res.status(404).json("Spot couldn't be found")
})


module.exports = router;
