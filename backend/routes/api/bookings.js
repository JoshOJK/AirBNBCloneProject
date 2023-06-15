const express = require('express')
const router = express.Router();

const { Op } = require('sequelize');
const { Spot } = require('../../db/models')
const { User } = require('../../db/models')
const { SpotImage } = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models')
const { ReviewImage } = require('../../db/models')
const { Booking } = require('../../db/models')
const sequelize = require('sequelize')


router.put('/:bookingId', requireAuth, async (req, res, next) => {
    let user = req.user;
    let bookingId = req.params.bookingId;
    let spot

    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(bookingId);

    if(!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
          })
    }
    if (user.id !== booking.userId) {
        return res.status(403).json({
            message: 'Forbidden'
        })
    }
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





        let bookedEndDate;
        let bookedStartDate;


        bookedStartDate = new Date(booking.startDate)
        bookedEndDate = new Date(booking.endDate)
        let currDate = new Date();


        if(currDate > bookedEndDate) {
            return res.status(403).json({
                message: "Past bookings can't be modified"
              })
        }
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


      booking.startDate = startDate
      booking.endDate = endDate
      await booking.save()

      return res.json(booking)

})


router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    let bookingId = req.params.bookingId;
    let user = req.user;
    let removeBooking = await Booking.findByPk(bookingId)
    let currDate = new Date()


      if (!removeBooking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
          })
      }
    let start = new Date(removeBooking.startDate);

    if(currDate > start) {
        res.status(403).json({
            message: "Bookings that have been started can't be deleted"
          })
    }

    const spot = await Spot.findByPk(removeBooking.spotId)

    if(spot.ownerId === user.id) {
        await removeBooking.destroy()
           return res.json({message: "Successfully deleted"})

    } else if(removeBooking.userId !== user.id) {
        return res.json({message: "Forbidden"})
    }
    await removeBooking.destroy()
    return res.json({message: "Successfully deleted"})




})

module.exports = router;
