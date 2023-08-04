import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { fetchSpotDetails} from "../../store/spots";
import {fetchSpotReviews} from "../../store/reviews"
import "../DeleteForm/DeleteForm.css"


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
        <h2 className="borp">CONFIRM DELETE</h2>
        <p>Are you sure youd like to delete your review?</p>
        <div className="button57-container">
            <button onClick={() => handleDelete()}>YES (delete review)</button>
            <button id="no-button1" onClick={() => window.location.reload()}>NO (keep review)</button>
            </div>
        </div>
    )
}

export default DeleteReviewForm;
