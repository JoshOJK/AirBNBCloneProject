import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';
import { fetchSpotDetails } from '../../store/spots'
import { fetchSpotReviews } from "../../store/reviews";
import './SpotDetails.css'; // Make sure to import the CSS file

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id]);
  const review = useSelector((state) => state.reviews[id])
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


    useEffect(() => {
      dispatch(fetchSpotDetails(id));
        dispatch(fetchSpotReviews(id));

    }, [dispatch, id]);

  if (!spot) {
    return <h1>...Loading</h1>
  }

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="spot-container">
  {spot && (
    <div>
      <div className="spot-details">
        <h1>{spot?.name}</h1>
        <div className="image-gallery">
          {spot?.SpotImages && spot?.SpotImages.map((image, index) => (
            <img
              key={image.id}
              src={image?.url}
              alt="Spot Preview"
              onClick={() => handleImageChange(index)}
              className={index === currentImageIndex ? "active" : ""}
            />
          ))}
        </div>
        <div className="address-container">
          <i className="fas fa-map-marker-alt"></i>
          <span className="address">{spot?.address}, {spot?.country}</span>
        </div>
        <p className="description">{spot?.description}</p>
        <div className="price-container">
          <span className="price">${spot?.price} per night</span>
          <NavLink className="book-btn" to={`/booking/${spot?.id}`}>Book Now</NavLink>
        </div>
        {review && review.length > 0 ? (
          <div className="spot-reviews">
            <NavLink className="review-button" to={`/spots/${id}/review/new`}>add a Review</NavLink>
            <h2>Reviews</h2>
            {review?.map((review) => (
              <div key={review.id} className="review">
                <div className="review-header">
                  <span className="review-person">{review.User?.firstName}</span>
                  <span className="review-date">{new Date(review?.createdAt).toLocaleDateString("en-US", {
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="review-text">{review?.review}</div>
              </div>
            ))}
          </div>
        ) : (
          <>
          <div className="no-reviews">No reviews yet for this spot.</div>
          <NavLink className="review-button" to={`/spots/${id}/review/new`}>New Review</NavLink>
          </>
        )}
      </div>
    </div>
  )}
</div>
  )
}

export default SpotDetails;
