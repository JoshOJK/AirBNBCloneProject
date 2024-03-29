import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createSpot, createSpotImage } from "../../store/spots";
import "./CreateSpot.css"

const CreateSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [urls, setUrls] = useState(["", "", "", ""]);
  const [preview, setPreview] = useState('')
  const [errors, setErrors] = useState({});
  const [validSubmit, setValidSubmit] = useState(false);




    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePreviewImage = (e) => {
        setPreviewImage(e.target.value)
        setPreview(true);
    };


    const handleNewSpot = async (e) => {
        e.preventDefault();


const errors = {};
    if(!country) {
        errors.country = "Country is required";
    }
    if(!address) {
        errors.address = "Street address is required"
    }
    if(!city) {
        errors.city = "City is required"
    }
    if(!state) {
        errors.state = "State is required"
    }
    if(!lng) {
        errors.lng = "Lng is required"
    }
    if(!lat) {
        errors.lat = "Lat is requried"
    }
    if(!description || description.length < 30) {
        errors.description = "Description needs atleast 30 characters"
    }
    if(!name) {
        errors.name = "Name is required"
    }
    if(!price) {
        errors.price = "Price is required"
    }
    if(!previewImage) {
        errors.previewImage = "Preview Image is required"
    }
    if(!urls) {
        errors.urls = "Image url must end in a .png, .jpg, or .jpeg"
    }
    setErrors(errors)

    if(Object.values(errors).length === 0) {
        setValidSubmit(true);


        const safeSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        };

       try {

            const createdSpot = await dispatch(createSpot(safeSpot));
            if(createdSpot) {
            await dispatch(
              createSpotImage(createdSpot.id, {preview: true, url: previewImage})
            );
            urls?.forEach(async (url) => {
              if (url) {
                await dispatch(createSpotImage(createdSpot.id, {preview: false, url: url}));
              }
            });
        }
            history.push(`/spots/${createdSpot.id}`);
          } catch (error) {
            console.error("Spot creation failed:", error);
          }
          setValidSubmit(false)
        }
    }


return (
    <section className="create-spot-container">
        <h2>Create a New Spot!</h2>
        <p>Where is you place located?</p>
        <p>Guests will only get your exact address once they booked a reservation</p>
        <form onSubmit={handleNewSpot} className="create-spot-form">
            <div className="general-info">
            <input
                type="country"
                placeholder="country"
                value={country}
                onChange={updateCountry} />
                {errors.country && (
                    <p className='error-create'>{errors.country}</p>
                )}
                <div className="info">
            <input
                type="string"
                placeholder="address"
                value={address}
                onChange={updateAddress} />
                {errors.address && (
                    <p className='error-create'>{errors.address}</p>
                )}
                </div>
                <div className="info">
            <input
                type="string"
                placeholder="city"
                value={city}
                onChange={updateCity} />
                {errors.city && (
                    <p className='error-create'>{errors.city}</p>
                )}
                </div>
                <div className="info">
            <input
                type="string"
                placeholder="STATE"
                value={state}
                onChange={updateState} />
                {errors.state && (
                    <p className='error-create'>{errors.state}</p>
                )}
                </div>
                <div className="info">
                <input
                type="number"
                placeholder="Latitutde"
                min="-90"
                max="90"
                value={lat}
                onChange={updateLat} />
                {errors.lat && (
                    <p className='error-create'>{errors.lat}</p>
                )}
                </div>
                <div className="info">
                <input
                type="number"
                placeholder="Longitude"
                min="-180"
                max="180"
                value={lng}
                onChange={updateLng} />
                {errors.lng && (
                    <p className='error-create'>{errors.lng}</p>
                )}
                </div>
                </div>
                <div className="description-container">
                <h2>Describe your place to guests</h2>
                <p>Mention the best features of your space, any special
                amenitites like fast wifi or parking, and what you love about the neighboorhood</p>
            <textarea
            className="description-textarea"
                type="string"
                placeholder="please write atleast 30 characters"
                value={description}
                onChange={updateDescription} />
                {errors.description && (
                    <p className='error-create'>{errors.description}</p>
                )}

                </div>
                <div className="name-container">
                <h2>Create a title for your spot</h2>
                <p>Catch guests' attention with a spot title that highlights what makes
                your place special.</p>
            <input
                type="string"
                placeholder="Name of your spot"
                value={name}
                onChange={updateName} />
                {errors.name && (
                    <p className='error-create'>{errors.name}</p>
                )}
                </div>
                <div className="price-container0">
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher
                    in search results.</p>
            <input
                type="number"
                placeholder="Price per Night (USD)"
                min="0"
                value={price}
                onChange={updatePrice} />
                {errors.price && (
                    <p className='error-create'>{errors.price}</p>
                )}
                </div>
            <div className="images-container">
            <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
            <input
                type="string"
                placeholder="Preview Image Url"
                value={previewImage}
                onChange={updatePreviewImage}/>
                {errors.previewImage && (
                    <p className='error-create'>{errors.previewImage}</p>
                )}
                <div >
                    {urls?.map((url, index)=> (
                        <div className="image-url"key={index}>
                <input
                type="string"
                placeholder="Image Url"
                value={url}
                onChange={(e) => {
                    const newUrls = [...urls];
                    newUrls[index] = e.target.value;
                    setUrls(newUrls)}} />
                    </div>
                    ))}
                </div>
                </div>
            <button type="submit" className="create-spot-btn" disabled={validSubmit}>Create Spot</button>
        </form>
    </section>
);
}





export default CreateSpot;
