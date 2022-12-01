import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { fetchSpots } from "../../store/spots";

import "./SpotsShow.css"
import SpotCard from "../SpotCard";


const SpotsShow = () => {

    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);

    const spots = useSelector(state => Object.values(state.spots));

    const displaySpots = spots.map((spot) => (
        <NavLink key={spot.id} to={`/spots/${spot.id}`}>
            <SpotCard spot={ spot } />
        </NavLink>
    ));

    useEffect(() => {
        dispatch(fetchSpots())
        .then(() => setIsLoaded(true));
    }, [ dispatch ]);

    return isLoaded && (
        <>
            <div className="spot-show-main-container">
                {displaySpots}
            </div>
            <div className="splash-page-show">
                <div className="about-me-links">
                    <a href="https://www.linkedin.com/in/rudy-nguyen/" class="fa-brands fa-linkedin fa-2xl" target={"_blank"}></a>
                    <a href="https://github.com/rudyn2010/OxygenBnB" class="fa-brands fa-github fa-2xl" target={"_blank"}></a>
                </div>
                <div className="about-text">
                    OxygenBnB by Rudy Nguyen
                </div>
            </div>
        </>
    );
};

export default SpotsShow;
