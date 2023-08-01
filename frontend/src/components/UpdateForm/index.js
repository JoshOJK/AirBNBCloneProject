import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateUserSpot, fetchSpotDetails } from "../../store/spots";


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
        <form onSubmit={handleSubmit} className="create-spot-form">
            <div>
            <input
                type="text"
                name="country"
                placeholder="country"
                value={data.country}
                onChange={handleStringData} />

                </div>
                <div>
            <input
                type="text"
                name="address"
                placeholder="address"
                value={data.address}
                onChange={handleStringData} />

                </div>
                <div>
            <input
                type="string"
                placeholder="city"
                name="city"
                value={data.city}
                onChange={handleStringData} />

                </div>
                <div>
            <input
                type="string"
                text="state"
                placeholder="state"
                value={data.state}
                onChange={handleStringData} />

                </div>
                <div>
                <input
                type="number"
                name="lat"
                placeholder="Latitutde"
                min="-90"
                max="90"
                value={data.lat}
                onChange={handleNumberData} />

                </div>
                <div>
                <input
                type="number"
                name="lng"
                placeholder="Longitude"
                min="-180"
                max="180"
                value={data.lng}
                onChange={handleNumberData} />

                </div>
                <div>
            <input
                type="string"
                name="name"
                placeholder="Name"
                value={data.name}
                onChange={handleStringData} />

                </div>
                <div>
            <textarea
                name="description"
                type="string"
                placeholder="Description"
                value={data.description}
                onChange={handleStringData} />


                </div>
                <div>
            <input
                type="number"
                name="price"
                placeholder="Price per Night (USD)"
                min="0"
                value={data.price}
                onChange={handleNumberData} />

                </div>
            <div>
            <input
                type="string"
                name="previewImage"
                placeholder="Preview Image Url"
                value={data.previewImage}
                onChange={handleStringData}/>

            </div>
            <button type="submit" className="create-spot-btn" >Create Spot</button>
        </form>
    </section>
    )
}

export default UpdateForm;
