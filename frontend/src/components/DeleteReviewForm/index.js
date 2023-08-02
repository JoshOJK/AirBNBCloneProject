import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { fetchSpotDetails} from "../../store/spots";
import {fetchSpotReviews} from "../../store/reviews"


const DeleteReviewForm = ({reviewId}) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleDelete = () => {
            const deletedReview = dispatch(deleteReview(reviewId))
            if(deletedReview) {
                window.location.reload();
                dispatch(fetchSpotDetails(id));
                dispatch(fetchSpotReviews(id));
        }
    }

    return (
        <div className="delete-container">
        <h2 className="delete-text">You are about to delete your review are you sure</h2>
            <button onClick={() => handleDelete()}>YES</button>
            <button onClick={() => window.location.reload()}>NO</button>
        </div>
    )
}

export default DeleteReviewForm;
