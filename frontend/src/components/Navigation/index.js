import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';
// import '../../../public/images/airbnb-logo.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
        <button onClick={logout}>Log Out</button>
      </li>
    );
  } else {
    sessionLinks = (
      <li className='loginoutlinks'>
        <NavLink className='login'to="/login">Log In</NavLink>
        <NavLink className='signup' to="/signup">Sign Up</NavLink>
      </li>
    );
  }

  return (
    <ul>
      <li className='homepagelink' >
        <NavLink className='home-btn' exact to="/">
          <img className="homeLogo-png" src={"https://cdn.pixabay.com/photo/2018/05/08/21/28/airbnb-3384008_1280.png"} alt="airbnblogo"></img>
        </NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
