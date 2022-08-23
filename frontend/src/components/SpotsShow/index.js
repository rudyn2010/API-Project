import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { fetchSpots } from "../../store/spots";


const SpotsShow = () => {

    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));

    const displaySpots = spots.map((spot) => (
        <NavLink key={spot.id} to={`/spots/${spot.id}`}>
            <div>{spot.name}</div>
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
            <h2>Spots Grid</h2>
            <div>
                {/* {probably some function to render my spots} */}
                {displaySpots}
            </div>
        </>
    )
};

export default SpotsShow;

// export default SportShow = () => {

// }
