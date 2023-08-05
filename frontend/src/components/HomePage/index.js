import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SpotDetails from "../SpotDetails";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  let spotsObject = useSelector((state) => state.spots);

  spotsObject = Object.entries(spotsObject).filter(([key]) => key !== "detail");

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div className="homepage">
      <ul className="spotsTile">
        {spotsObject.map(([key, spot]) => (
          <NavLink className="spotsNavigation" to={`/spots/${spot.id}`} title={spot.name} key={key}>
            <li key={spot.id} className="singularSpot">
              <img className='spotImage' src={spot.previewImage} alt="Spot Preview" />
              <div className="spot-details-tag">
              <div>
                <h1 className="citystate">{spot.city}, {spot.state}{" "}</h1>
                </div>
              <div className="star-and-star-rating">
                <img
                  className="starimg"
                  src="https://static.vecteezy.com/system/resources/previews/001/189/080/original/star-png.png"
                  alt="Star Rating"
                />{spot.avgRating !== '0.00' ? spot.avgRating : "New"}
              </div>
              </div>
              <h2 className="spotName">{spot.name}</h2>
              <p className="price">${spot.price}/night</p>
            </li>
          </NavLink>
        ))}
      </ul>

      <Switch>
        <Route path="/spots/:id" component={SpotDetails} />
      </Switch>
    </div>
  )
}

export default HomePage;
