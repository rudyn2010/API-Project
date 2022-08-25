import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchReviewsOfCurrUser } from "../../store/reviews";



const CurrentUserReviewsShow = () => {

    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);

    const reviews = useSelector((state) => Object.values(state.reviews));

    //styling for reviews
    console.log("IM HERE L16:", reviews)

    useEffect(() => {
        dispatch(fetchReviewsOfCurrUser())
        .then(() => setIsLoaded(true));
    }, [ dispatch ]);


    return  isLoaded && (
        <>
            {reviews.map((review) => (
                <div>
                    {review?.stars}
                    {review?.review}
                </div>
            ))}
        </>
    )

}

export default CurrentUserReviewsShow;
