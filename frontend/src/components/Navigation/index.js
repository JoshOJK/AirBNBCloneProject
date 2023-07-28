import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots)
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <ul className='navbar'>
      <li className='homepagelink'>
        <NavLink className='home-btn' exact to="/">
          <img className="homeLogo-png" src="https://cdn.pixabay.com/photo/2018/05/08/21/28/airbnb-3384008_1280.png" alt="airbnblogo"></img>
        </NavLink>
      </li>
        {sessionUser && (
        <li className='create-spot'>
          <NavLink className='create-spot-link' to='/spots/new'>
            Create a Destination
          </NavLink>
        </li>
        )}
      <li className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
        <span className="dropdown-btn">Menu</span>
        {showDropdown && (
          <ul className="dropdown-content">
            {sessionUser ? (
              <>
                <ProfileButton user={sessionUser} />
                <li>
                  <button onClick={logout}>Log Out</button>
                </li>
              </>
            ) : (
              <li className='loginoutlinks'>
                <NavLink className='login' to="/login">Log In</NavLink>
                <span className="divider">|</span>
                <NavLink className='signup' to="/signup">Sign Up</NavLink>
              </li>
            )}
          </ul>
        )}
      </li>
    </ul>
  );
}

export default Navigation;
