import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createAReviewForSpot } from "../../store/reviews";
import { fetchSpotById } from "../../store/spots";
import "./ReviewModal.css"

const ReviewForm = () => {

    const dispatch = useDispatch();
    const { spotId } = useParams();

    const [ review, setReview ] = useState("");
    const [ stars, setStars ] = useState(0);

    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
      let errors = [];
      if (review.length > 255) errors.push("Review must be under 255 or less!")

      setErrors(errors);
    },  [review, stars ])

    const onSubmit = (e) => {
        e.preventDefault();

        const reviewData = {
            review,
            stars
        };

        dispatch(createAReviewForSpot({reviewData, spotId})).catch(
          async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
            else if (data && data.message) {
              setErrors([data.message])
            }
          }
        )
        .then(() => {dispatch(fetchSpotById(spotId))});

    };

    return (
      <div className="review-modal-display">
        <form className="review-form" onSubmit={onSubmit}>
          <div className="review-form-header">Review / Comment</div>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
              ))}
          </ul>
            <input className="modal-input-field overflow-field"
              placeholder="Review"
              type="text"
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
              />
            <input className="modal-input-field"
              placeholder="Rate 1 - 5 Stars!"
              type="number"
              name="stars"
              value={stars}
              min={0}
              max={5}
              onChange={(e) => setStars(e.target.value)}
              required
              />
          <button className="review-continue" type="submit">
            Continue
          </button>
        </form>
      </div>
    );
  }

  export default ReviewForm;
