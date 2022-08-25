import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchReviewsOfCurrUser } from "../../store/reviews";



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


    return  isLoaded && (
        <>
            {reviewDisplay}
        </>
    )

}

export default CurrentUserReviewsShow;
