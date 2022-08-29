import { useDispatch, useSelector } from "react-redux";
import { deleteAReview } from "../../store/reviews";

import "./ReviewsCard.css";


const ReviewsCard = ({ review }) => {

    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);

    let date = new Date().toLocaleDateString();

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
        <div className="review-main-container">
            <div className="review-header">
                <div className="review-user-info">
                    <i className="fa-solid fa-user fa-2xl"></i>
                    <div className="name-date">
                        <div className="reviewer-name">User Number #{review?.userId}</div>
                        <div className="reviewer-date">{date}</div>
                    </div>
                </div>
            </div>
            <div className="review-inner-container">
                {review.review}
            </div>
            <div className="make-button-go-right">
                {currentUser && (
                    <button className="reviewDelete review-delete-button" onClick={handleDelete}> Delete</button>
                    )
                }
            </div>
        </div>
    );

};

export default ReviewsCard;
