import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import SpotFormModal from "../CreateSpotModal";
import LoginFormModal from '../LoginFormModal';

import SignupFormModal from '../SignupFormModal';
import "./NewNavBar.css";

const NewNavBar = ({ isLoaded }) => {
    const sessionUser = useSelector((state) => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
          <>
            <SpotFormModal />
            <ProfileButton user={sessionUser} />
          </>
        );
      } else {
        sessionLinks = (
          <>
            <LoginFormModal />
            <SignupFormModal />
          </>
        );
      }

    return (
        <div className="oxygen-logo-profile-nav">
            <NavLink exact to="/">
                <div className="logo-name-container">
                    <div className="fa-brands fa-airbnb fa-3x" />
                    <div className="oxygenbnb-title">oxygenbnb</div>
                </div>
            </NavLink>
            <div>
                {isLoaded && sessionLinks}
            </div>
        </div>
    )
}

export default NewNavBar;
