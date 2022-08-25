import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { deleteASpot, fetchSpotById } from "../../store/spots";
import EditSpotModal from "../EditSpotModal";
import { fetchReviewBySpotId } from "../../store/reviews";


const SpotDetailsCard = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [ isLoaded, setIsLoaded ] = useState(false);

    let { spotId } = useParams();
    spotId = parseInt(spotId);

    //Object.values => potentially to key into it later
    const spots = useSelector((state) => state.spots);
    const spot = spots[spotId]

    const reviews = useSelector((state) => Object.values(state.reviews));

    console.log("IM HEREERERER:", reviews)
    // const sessionUser = useSelector((state) => state.session.user);

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteASpot(spotId));
        history.push("/");
    };

    useEffect(() => {
        dispatch(fetchSpotById(spotId)).then(() =>
        dispatch(fetchReviewBySpotId(spotId)))
        .then(() => setIsLoaded(true));
    }, [ dispatch, spotId ]);

    if (!spot) {
        return null;
    };

    return isLoaded && (
        <>
            <h2>Example Spot Details:</h2>
            <p>{spot.address}</p>
            <p>{spot.name}</p>
            <p>{spot.description}</p>
            <p>{spot.price}</p>
            <p>{reviews[0]?.stars}</p>
            <p>{reviews[0]?.review}</p>
            <button onClick={handleDelete}>Delete</button>
            <EditSpotModal />
        </>
    )
}

export default SpotDetailsCard;
