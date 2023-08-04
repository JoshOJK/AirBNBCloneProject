import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserSpots } from "../../store/spots";
import "./ManageSpots.css"
import  DeleteForm from "../DeleteForm/index.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import reviewReducer from "../../store/reviews";

const ManageSpot = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const spots = useSelector((state) => state.spots);

    const spotsObject = Object.values(spots)


    const spotsArray = Array.isArray(spotsObject) ? spotsObject?.filter(spot => spot.ownerId === sessionUser.id) : [];
    console.log("OBJECT:",spots, "ARRAY OF OBJECT:", spotsObject, "ARRAY:", spotsArray)
   useEffect(() => {
    dispatch(fetchUserSpots(userId))
   }, [dispatch, userId])


if(!spotsArray.length) {
  return (
    <>
    <p>you do not own any spots create one here</p>
     <li className='create-spot'>
      <NavLink className='create-spot-link' to='/spots/new'>
        --Create a Destination--
      </NavLink>
    </li>
    </>
  )
} else {
  return (
    <div className="homepage">
        <>
        <h2>Manage Your Spots</h2>
        <NavLink className='create-spot-link' to='/spots/new'>--Create a Destination--</NavLink>
       <ul className="spotsTile">
           {Array.isArray(spotsArray) && spotsArray?.map((spot) => (
            <div>
             <NavLink className="spotsNavigation" to={`/spots/${spot.id}`} title={spot.name} key={spot.id}>
               <li key={spot.id} className="singularSpot">
                 <img className='spotImage' src={spot.previewImage} alt="Spot Preview" />
                 <h1 className="citystate">{spot.city}, {spot.state} <img className="starimg" src='https://static.vecteezy.com/system/resources/previews/001/189/080/original/star-png.png' alt="Star Rating" />{spot.avgRating}</h1>
                 <h2 className="spotName">{spot.name}</h2>
                 <p className="price">${spot.price}/night</p>
               </li>
               <div></div>
             </NavLink>
             <NavLink to={`/spots/${spot.id}/update`}>update</NavLink>
             <OpenModalMenuItem
              itemText="Delete"
              modalComponent={<DeleteForm spot={spot.id}/>}
            />

             </div>
           ))}

         </ul>
        </>


    </div>
)
}
}

export default ManageSpot;
