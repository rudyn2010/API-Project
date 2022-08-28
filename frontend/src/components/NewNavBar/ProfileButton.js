import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory} from "react-router-dom";
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
        <div className="profile-dropdown">
          <div className="">
              <div className="welcome-dropdown"> Welcome, {user.firstName}</div>
          </div>
            <div className="linkhighlight-dropdown">
              <NavLink className="your-text-dropdown" to="/your-listings">
                  Your Listings
              </NavLink>
            </div>
            <div className="linkhighlight-dropdown">
              <NavLink className="your-text-dropdown" to="/your-reviews">
                Your Reviews
              </NavLink>
            </div>
          <div className="logout-dropdown" onClick={logout}>Log Out</div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
