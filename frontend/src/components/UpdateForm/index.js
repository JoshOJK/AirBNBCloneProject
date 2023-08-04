import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateUserSpot, fetchSpotDetails } from "../../store/spots";
import "../CreateSpot/CreateSpot.css"


const UpdateForm = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector((state) => state.spots[spotId])
    const [data, setData] = useState({
        country: "",
        address: "",
        city: "",
        state: "",
        description: "",
        name: "",
        price: "",
        previewImage: "",
    })
    useEffect(() => {
        if (spot) {
          setData({
            country: spot.country,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            description: spot.description,
            name: spot.name,
            price: spot.price,
            previewImage: spot.previewImage,
          });
        }else {
            dispatch(fetchSpotDetails(spotId))
              .then((data) => {
                setData({
                  country: data.country,
                  address: data.address,
                  city: data.city,
                  state: data.state,
                  description: data.description,
                  name: data.name,
                  price: data.price,
                  previewImage: data.previewImage,
                });
              })
              .catch((err) => console.error(err));
          }
        }, [dispatch, spotId, spot]);
    const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(updateUserSpot(spotId, data))
                .then(() => {
                    history.push(`/spots/${spotId}`)
                })
                .catch((errors) => console.error(errors))
        }

    const handleStringData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value

        })
    }

    const handleNumberData = (e) => {
        setData({
            ...data,
            [e.target.name]: Number(e.target.value),
          });
    }

    return (
        <section className="create-spot-container">
            <h2>Create a New Spot!</h2>
                <p>Where is you place located?</p>
                <p>Guests will only get your exact address once they booked a reservation</p>
        <form onSubmit={handleSubmit} className="create-spot-form">
            <div className="general-info">
            <div>
            <input
                type="text"
                name="country"
                placeholder="country"
                value={data.country}
                onChange={handleStringData} />

                </div>
                <div className="info">
            <input
                type="text"
                name="address"
                placeholder="address"
                value={data.address}
                onChange={handleStringData} />

                </div>
                <div className="info">
            <input
                type="string"
                placeholder="city"
                name="city"
                value={data.city}
                onChange={handleStringData} />

                </div>
                <div className="info">
            <input
                type="string"
                text="state"
                placeholder="state"
                value={data.state}
                onChange={handleStringData} />

                </div>
                <div className="info">
                <input
                type="number"
                name="lat"
                placeholder="Latitutde"
                min="-90"
                max="90"
                value={data.lat}
                onChange={handleNumberData} />

                </div>
                <div className="info">
                <input
                type="number"
                name="lng"
                placeholder="Longitude"
                min="-180"
                max="180"
                value={data.lng}
                onChange={handleNumberData} />

                </div>
                <div className="description-container">
                <h2>Describe your place to guests</h2>
                <p>Mention the best features of your space, any special
                amenitites like fast wifi or parking, and what you love about the neighboorhood</p>
            <textarea
            className="description-textarea"
                name="description"
                type="string"
                placeholder="Description"
                value={data.description}
                onChange={handleStringData} />


                </div>
                <div className="name-container">
                <h2>Create a title for your spot</h2>
                <p>Catch guests' attention with a spot title that highlights what makes
                your place special.</p>
            <input
                type="string"
                name="name"
                placeholder="Name"
                value={data.name}
                onChange={handleStringData} />

                </div>
                <div className="price-container">
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher
                    in search results.</p>
            <input
                type="number"
                name="price"
                placeholder="Price per Night (USD)"
                min="0"
                value={data.price}
                onChange={handleNumberData} />

                </div>
            <div className="images-container">
            <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
            <input
                type="string"
                name="previewImage"
                placeholder="Preview Image Url"
                value={data.previewImage}
                onChange={handleStringData}/>

            </div>
            </div>
            <button type="submit" className="create-spot-btn" >Update Spot</button>
        </form>
    </section>
    )
}

export default UpdateForm;
