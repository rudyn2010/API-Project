import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import "./ProfileButton.css"

function ProfileButton({ user }) {

  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <>
        <div className="profile-hamburger" onClick={openMenu}>
          <i className="fa-solid fa-bars" />
          <i className="fas fa-user-circle fa-xl" />
        </div>

      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.firstName}, {user.lastName}</li>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <NavLink to="/your-listings">Your Listings</NavLink>
          </li>
          <li>
            <NavLink to="/your-reviews">Your Reviews</NavLink>
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
