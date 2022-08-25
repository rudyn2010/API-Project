import { useDispatch, useSelector } from "react-redux";
import { deleteAReview } from "../../store/reviews";

import "./ReviewsCard.css";


const ReviewsCard = ({ review }) => {

    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    let currentUser;

    if (sessionUser && review) {
        if (sessionUser.id === review.userId) {
            currentUser = true
        }
        else currentUser = false;
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteAReview(review.id));
    };


    return (
        <div key={review.id} className="review-main-container">
            <div className="review-inner-container">
                <div className="review-text-desc">
                    {review.review}
                </div>
                <div className="review-star-number">
                    {review.stars}
                </div>
            </div>
            {currentUser && (
                    <button className="reviewDelete" onClick={handleDelete}> Delete</button>
                )
            }
        </div>
    );

};

export default ReviewsCard;
