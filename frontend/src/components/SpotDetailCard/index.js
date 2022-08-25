import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { deleteASpot, fetchSpotById } from "../../store/spots";
import EditSpotModal from "../EditSpotModal";
import { fetchReviewBySpotId } from "../../store/reviews";
import ReviewFormModal from "../ReviewModal";


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

    const reviewDisplay = reviews.map((review) => (
        <div key={review.id} className="review-main-container">
            <div className="review-inner-container">
                <div className="review-text-desc">
                    {review.review}
                </div>
                <div className="review-star-number">
                    {review.stars}
                </div>
            </div>
        </div>
    ))

    return isLoaded && (
        <>
            <h2>Example Spot Details:</h2>
            <p>{spot.address}</p>
            <p>{spot.name}</p>
            <p>{spot.description}</p>
            <p>{spot.price}</p>
            <h3>Reviews Section:</h3>
            {reviewDisplay}
            {/* <p>{reviews[0]?.stars}</p>
            <p>{reviews[0]?.review}</p> */}
            <button onClick={handleDelete}>Delete</button>
            <EditSpotModal />
            <ReviewFormModal />
        </>
    )
}

export default SpotDetailsCard;
