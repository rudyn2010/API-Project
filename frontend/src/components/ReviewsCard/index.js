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

    console.log("REVIEW HERE:", review)

    return (
        <div className="review-main-container">
            <div className="review-header">
                <div className="review-user-info">
                    <i class="fa-solid fa-user fa-2xl"></i>
                    <div className="name-date">
                        <div className="reviewer-name">Name Here</div>
                        <div className="reviewer-date">Test Date '22</div>
                    </div>
                </div>

                <div className="star-review-display">
                    <div className="star-sharp"><i className="fa-solid fa-star fa-sm"></i></div>
                    <div className="review-rating">{review?.stars}</div>
                </div>
            </div>
            <div className="review-inner-container">
                <div className="review-text">
                    {review.review}
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
