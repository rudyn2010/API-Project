import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getCurrentUsersSpot } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./CurrentUserSpotsShow.css"

const CurrentUserSpotsShow = () => {

    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);

    const spots = useSelector((state) => Object.values(state.spots));

    const displaySpots = spots.map((spot) => (
        <NavLink key={spot.id} to={`/spots/${spot.id}`}>
            <SpotCard spot={ spot } />
        </NavLink>
    ));

    useEffect(() => {
        dispatch(getCurrentUsersSpot())
        .then(() => setIsLoaded(true));
    }, [ dispatch ]);

    return isLoaded && (
        <>
            <div className="your-listings-display">
                <h1>Your Properties</h1>
            </div>
            <div className="spot-show-main-container">
                {displaySpots}
            </div>
        </>

        );

};

export default CurrentUserSpotsShow;
