import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotDetals from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot";
import CreateReviewForm from "./components/CreateReview";
import ManageSpot from "./components/ManageSpots";
import DeleteForm from "./components/DeleteForm";
import UpdateForm from "./components/UpdateForm";


// import "./SignupForm.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (
      <Switch>
        <Route path="/user/:userId/spots">
          <ManageSpot />
        </Route>
        <Route exact path='/spots/:id/review/new'>
      <CreateReviewForm />
        </Route>
        <Route path="/spots/:spotId/update">
          <UpdateForm />
        </Route>
        <Route path="/spots/new">
          <CreateSpot />
        </Route>
        <Route exact path='/spots/:id'>
          <SpotDetals />
        </Route>
        <Route exact path='/'>
          <HomePage />
        </Route>
      </Switch>
    )}
    </>
  );
}
export default App;
