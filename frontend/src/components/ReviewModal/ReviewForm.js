import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createAReviewForSpot } from "../../store/reviews";


const ReviewForm = () => {

    const dispatch = useDispatch();
    const { spotId } = useParams();

    const [ review, setReview ] = useState("");
    const [ stars, setStars ] = useState(0);

    //TODO: Check if reviews needs a length validator

    const onSubmit = (e) => {
        e.preventDefault();

        const reviewData = {
            review,
            stars
        };

        dispatch(createAReviewForSpot({reviewData, spotId}));

    };

    return (
      <form onSubmit={onSubmit}>
        <h2>Leave A Review</h2>
        <label>
          Review
          <input
            type="text"
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <label>
          Stars
          <input
            type="number"
            name="stars"
            value={stars}
            min={0}
            max={5}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </label>
        <button type="submit">
          Continue
        </button>
      </form>
    );
  }

  export default ReviewForm;
