import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory, NavLink } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    <div className="menubutton-container">
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      </div>
      <div className="info-container">
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="user-info-nav">
            <li className="introduction">Hello, {user.username}</li>
            <li>{user.email}</li>
              <li>
                <NavLink className="manage-button" to={`/user/${sessionUser.id}/spots`}>Manage Spots</NavLink>
              </li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
      </div>
    </>
  );
}

export default ProfileButton;
