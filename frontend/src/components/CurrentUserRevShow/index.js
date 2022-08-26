import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


import { fetchReviewsOfCurrUser } from "../../store/reviews";
import ReviewsCard from "../ReviewsCard";
import "./CurrentUserRevShow.css"

const CurrentUserReviewsShow = () => {

    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);

    const reviews = useSelector((state) => Object.values(state.reviews));

    //styling for reviews

    useEffect(() => {
        dispatch(fetchReviewsOfCurrUser())
        .then(() => setIsLoaded(true));
    }, [ dispatch ]);

    const reviewDisplay = reviews.map((review) => (
        <NavLink key={review.id} to={`/spots/${review.spotId}`}>
            <ReviewsCard review={ review } />
        </NavLink>
    ))


    return  isLoaded && (
        <>
            <div className="your-listings-display">
                <h1 className="reviews-page-text">Your Reviews</h1>
            </div>
            <div className="spot-show-main-container">
                {reviewDisplay}
            </div>
        </>
    )

}

export default CurrentUserReviewsShow;
