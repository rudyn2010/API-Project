import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { deleteASpot, fetchSpotById } from "../../store/spots";
import EditSpotModal from "../EditSpotModal";
import { fetchReviewBySpotId } from "../../store/reviews";
import ReviewFormModal from "../ReviewModal";
import ReviewsCard from "../ReviewsCard";
import "./SpotDetailCard.css"


const SpotDetailsCard = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [ isLoaded, setIsLoaded ] = useState(false);

    let { spotId } = useParams();
    spotId = parseInt(spotId);

    //Object.values => potentially to key into it later
    const sessionUser = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => Object.values(state.reviews));
    const spots = useSelector((state) => state.spots);

    const spot = spots[spotId]
    let currentUser;

    if (sessionUser && spot) {
        if (sessionUser.id === spot.ownerId) {
            currentUser = true;
        }
        else currentUser = false;
    }



    useEffect(() => {
        dispatch(fetchSpotById(spotId)).then(() =>
        dispatch(fetchReviewBySpotId(spotId)))
        .then(() => setIsLoaded(true));
    }, [ dispatch, spotId ]);

    const handleDelete = async (e) => {
        e.preventDefault();
        setIsLoaded(false)
        await dispatch(deleteASpot(spotId));
        history.push("/");
    };

    // if (!spot) {
    //     return null;
    // };

    const reviewDisplay = reviews.map((review) => (
        <ReviewsCard key={ review?.id } review={ review } />
    ))

    return isLoaded && (
        <>
            { currentUser && (
                    <>
                    <EditSpotModal />
                    <button onClick={handleDelete}>Delete</button>
                    </>
                )
            }
        <div className="spot-detail-main">
            <div className="spot-detail-title-widget">
                <div className="spot-name-text">{spot.description}: {spot.name}</div>
                <div className="spot-detail-bar">
                    <div className="star-sharp"><i className="fa-solid fa-star"></i></div>
                    <div>{spot.avgStarRating}</div>
                    <div>{spot.numReviews} review(s)</div>
                    <div>{spot.city}, {spot.state}, {spot.country}</div>
                </div>
            </div>
            <div className="image-display-container">
                { spot?.Images && (
                        <img src={spot?.Images[0]?.url} alt="Img Not Found"/>
                    )
                }
            </div>
        </div>
        <ReviewFormModal />
        <div className="spots-reviews-container">
            {reviewDisplay}
        </div>
        </>
    )
}

export default SpotDetailsCard;
