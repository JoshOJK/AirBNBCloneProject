import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";
import "./DeleteForm.css"


const DeleteForm = ({spot}) => {
    const dispatch = useDispatch();





    const handleDelete = () => {
            const deletedSpot = dispatch(deleteSpot(spot))
            if(deletedSpot) {
                window.location.reload();
        }
    }

    return (
        <div className="delete-container">
            <h2 className="borp">Confirm Delete</h2>
        <p className="delete-text">Are you sure you want to remove this spot
        from the listings?</p>
            <div className="button57-container">
            <button onClick={() => handleDelete()}>YES (Delete Spot)</button>
            <button id="no-button1"onClick={() => window.location.reload()}>NO (Keep Spot)</button>
            </div>
        </div>
    )
}

export default DeleteForm;
