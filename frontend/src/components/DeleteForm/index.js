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
        <h2 className="delete-text">You are about to delete your spot are you sure you'd like to delete your spot</h2>
            <button onClick={() => handleDelete()}>YES</button>
            <button onClick={() => window.location.reload()}>NO</button>
        </div>
    )
}

export default DeleteForm;
