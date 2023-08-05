import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';
import { fetchSpotDetails } from '../../store/spots'
import {  fetchSpotReviews } from "../../store/reviews";
import './SpotDetails.css'; // Make sure to import the CSS file
import  CreateReviewForm  from "../CreateReview";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import  DeleteReviewForm  from "../DeleteReviewForm"

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user)
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


console.log(spot.SpotImages)

  return (
    <div className="spot-container">
  {spot && (
    console.log(spot),
    <div className="information-container-details">
      <div className="spot-details">
        <div>
        <h1>{spot?.name}</h1>
        <span className="address-top"><i className="fas fa-map-marker-alt"></i>{spot?.city}, {spot?.state}, {spot?.country}</span>
        <div className="image-gallery">
          {spot?.SpotImages && spot?.SpotImages?.map((image, index) => (
            <img
              key={image?.id}
              src={image?.url}
              alt="Spot Preview"
              onClick={() => handleImageChange(index)}
              className={index === currentImageIndex ? "active" : "inactive"}
            />
          ))}
        </div>
        </div>
          {review && review.length === 1 ? (
            <div className="under-image-content">
             <div>
          <h2>Hosted By {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
          <p>{spot?.description}</p>
         </div>
          <div className="reserve-rating-container">
            <h2><span className="price">${spot?.price} per night</span> <img
            className="starimg"
            src="https://static.vecteezy.com/system/resources/previews/001/189/080/original/star-png.png"
            alt="Star Rating"
          />{spot?.avgStarRating} · {review?.length} Review</h2>
           <div className="price-container">
            <button className="reserve-btn" onClick={() => alert("Feature coming soon")}>Reserve</button>
           </div>
          </div>
          </div>
            ) : (
              <div className="under-image-content">
               <div>
                <h2>Hosted By {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
                <p>{spot?.description}</p>
              </div>
              <div className="reserve-rating-container">
              <h2><span className="price">${spot?.price} per night</span><img
            className="starimg"
            src="https://static.vecteezy.com/system/resources/previews/001/189/080/original/star-png.png"
            alt="Star Rating"
          /> {spot.avgStarRating !== '0.00' ? spot.avgStarRating : "New"} · {review?.length}  Reviews</h2>
          <div className="price-container">
            <button className="reserve-btn" onClick={() => alert("Feature coming soon")}>Reserve</button>
           </div>
           </div>
           </div>
          )}
           {review && review.length > 0  ? (

          <div className="spot-reviews">
             <h2><img
            className="starimg"
            src="https://static.vecteezy.com/system/resources/previews/001/189/080/original/star-png.png"
            alt="Star Rating"
          /> {spot?.avgStarRating !== '0.00' ? spot?.avgStarRating : "New"} · {review?.length}  Reviews</h2>
            {sessionUser && sessionUser?.id !== spot?.ownerId ? (
              <div className="create-review-button-modal">
              <OpenModalMenuItem
              itemText="Post your review"
              modalComponent={< CreateReviewForm />}
            />
            </div>
            ) : (
              <></>
            )}
            {review?.map((review) => (
              <div key={review.id} className="review">
                <div className="review-header">
                  <span className="review-person">{review.User?.firstName}</span>
                  <span className="review-date">{new Date(review?.createdAt).toLocaleDateString("en-US", {
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
                <div>
                <div className="review-text">{review?.review}</div>

        {review?.userId === sessionUser?.id && (
           <OpenModalMenuItem
           itemText="Delete"
           modalComponent={<DeleteReviewForm reviewId={review.id}/>}
         />
        )}
      </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
          <div><img
            className="starimg"
            src="https://static.vecteezy.com/system/resources/previews/001/189/080/original/star-png.png"
            alt="Star Rating"
          />{spot.avgStarRating !== '0.00' ? spot.avgStarRating : "New"} </div>
          <div className="no-reviews">No reviews yet for this spot.</div>
          {sessionUser && spot?.ownerId !== sessionUser?.id ? (
            <>
             <OpenModalMenuItem
             itemText="Be the first to post a review"
             modalComponent={< CreateReviewForm />}

           />
           </>

          ) : (
            <></>

          )}
          </div>
        )}
      </div>
    </div>
  )}
</div>
  )
}

export default SpotDetails;
