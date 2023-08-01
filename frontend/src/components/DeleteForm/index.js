import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";


const DeleteForm = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector((state) => state.spots[spotId])
    const history = useHistory();


    const handleDelete = (id) => {
        if(spot) {
            dispatch(deleteSpot(id))
            history.push(`/user/${sessionUser.id}/spots`)
        }
    }

    return (
        <>
        <h2>You are about to delete your spot are you sure you'd like to delete your spot</h2>
            <button onClick={() => handleDelete(spotId)}>YES</button>
            <button onClick={() => history.push(`/user/${sessionUser.id}/spots`)}>NO</button>
        </>
    )
}

export default DeleteForm;
