import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from "./components/HomePage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotDetals from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot";
import CreateReviewForm from "./components/CreateReview";
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
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path='/spots/:id/review/new'>
      <CreateReviewForm />
        </Route>
        <Route path="/spots/new">
          <CreateSpot />
        </Route>
        <Route exact path='/spots/:id'>
          <SpotDetals />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    )}
    </>
  );
}
export default App;
