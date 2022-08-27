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

    const [ errors, setErrors ] = useState([]);

    //TODO: Check if reviews needs a length validator

    const onSubmit = (e) => {
        e.preventDefault();

        const reviewData = {
            review,
            stars
        };

        dispatch(createAReviewForSpot({reviewData, spotId})).catch(
          async (res) => {
            const data = await res.json();
            console.log("AM I CORRECT", data)
            if (data && data.errors) setErrors(data.errors)
            else if (data && data.message) {
              setErrors([data.message])
            }
          }
        );
    };

    return (
      <form onSubmit={onSubmit}>
        <h2>Leave A Review</h2>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
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
