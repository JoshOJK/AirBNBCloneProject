import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const ManageSpot = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const reviews = useSelector((state) => state.reviews);

    const reviewsObject = Object.values(reviews)


    const reviewsArray = Array.isArray(reviewsObject) ? reviewsObject?.filter(review => review.userId === sessionUser.id) : [];
    console.log("OBJECT:",reviews, "ARRAY OF OBJECT:", reviewsObject, "ARRAY:", reviewsArray)
   useEffect(() => {
    dispatch(loadSpotReviews(userId))
   }, [dispatch, userId])


if(!reviewsArray.length) {
  return (
    <>
    <p>you have not reviewed a spot before</p>
    </>
  )
} else {
  return (
    <div className="homepage">
        <>
        {Array.isArray(reviewsArray) && reviewsArray ? (
          <div className="spot-reviews">
            <NavLink className="review-button" to={`/spots/${id}/review/new`}>New Review</NavLink>
            <h2>Reviews</h2>
            {reviewsArray?.map((review) => (
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
        </>


    </div>
)
}
}

export default ManageSpot;
