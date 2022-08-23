import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSpots } from "../../store/spots";


const SpotsShow = () => {

    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));

    const displaySpots = spots.map((spot) => (
        <div key={spot.id}>{spot.name}</div>
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
