import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchSpotById } from "../../store/spots";


const SpotDetailsCard = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    let { spotId } = useParams();
    spotId = parseInt(spotId);

    //Object.values => potentially to key into it later
    const spots = useSelector((state) => state.spots);
    const spot = spots[spotId]

    // const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {

        dispatch(fetchSpotById(spotId));

    }, [ dispatch ]);

    if (!spot) {
        return null;
    }

    return (
        <>
            <h2>Example Spot Details:</h2>
            <p>{spot.address}</p>
            <p>{spot.name}</p>
            <p>{spot.description}</p>
            <p>{spot.price}</p>
        </>
    )

}

export default SpotDetailsCard;
