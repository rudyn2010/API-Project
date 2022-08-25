import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { deleteASpot, fetchSpotById } from "../../store/spots";
import EditSpotModal from "../EditSpotModal";
import { fetchReviewBySpotId } from "../../store/reviews";


const SpotDetailsCard = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    let { spotId } = useParams();
    spotId = parseInt(spotId);

    //Object.values => potentially to key into it later
    const spots = useSelector((state) => state.spots);
    const spot = spots[spotId]

    // const sessionUser = useSelector((state) => state.session.user);

    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(deleteASpot(spotId));

        history.push("/");
    }

    useEffect(() => {
        dispatch(fetchSpotById(spotId));
        dispatch(fetchReviewBySpotId(spotId));
    }, [ dispatch, spotId ]);

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
            <button onClick={handleDelete}>Delete</button>
            <EditSpotModal />
        </>
    )
}

export default SpotDetailsCard;
