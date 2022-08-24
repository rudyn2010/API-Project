import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { fetchSpots } from "../../store/spots";

import "./SpotsShow.css"
import SpotCard from "../SpotCard";


const SpotsShow = () => {

    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));

    const displaySpots = spots.map((spot) => (
        <NavLink key={spot.id} to={`/spots/${spot.id}`}>
            <SpotCard spot={spot} />
        </NavLink>
    ));

    useEffect(() => {
        dispatch(fetchSpots());
    }, [ dispatch ]);

    if (!spots) {
        return null
    };

    return (
        <>
            <div className="spot-show-main-container">
                    {displaySpots}
            </div>
        </>
    );
};

export default SpotsShow;
