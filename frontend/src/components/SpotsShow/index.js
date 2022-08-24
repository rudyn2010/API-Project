import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { fetchSpots } from "../../store/spots";
import SpotCard from "../SpotCard";


const SpotsShow = () => {

    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));

    const displaySpots = spots.map((spot) => (
        <NavLink key={spot.id} to={`/spots/${spot.id}`}>
            <SpotCard spot={spot} />
        </NavLink>
    ))

    //template for useEffect, anon function into a return with a dependancy array
    useEffect(() => {

        dispatch(fetchSpots());

    }, [ dispatch ]);

    //conditionally rendering
    if (!spots) {
        return null
    }

    return (
        <>
            <div className="spot-show-main-container">
                <div>
                    {displaySpots}
                </div>
            </div>
        </>
    )
};

export default SpotsShow;

// export default SportShow = () => {

// }
