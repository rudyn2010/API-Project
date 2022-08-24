import { csrfFetch } from "./csrf";

//Types:
//get all
const LOAD_REVIEWS = 'reviews/getReviews';
const CREATE_REVIEW = 'reviews/createReview';
const READ_REVIEW = 'reviews/readReview';
const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/deleteReview';


//ActionCreators:
const actionLoadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    };
};

const actionCreateReview = () => {
    return {
        type: CREATE_REVIEW
    };
};

const actionReadReview = () => {
    return {
        type: READ_REVIEW
    };
};

const actionUpdateReview = () => {
    return {
        type: UPDATE_REVIEW
    };
};

const actionDeleteReview = () => {
    return {
        type: DELETE_REVIEW
    };
};


//Thunks:
export const fetchReviews = () => async (dispatch) => {
    const response = await csrfFetch("/api/reviews");

    if (response.ok) {
        const data = await response.json();
        dispatch(actionLoadReviews(data));

    };
};

export const createAReview = () => async (dispatch) => {
    const response = await csrfFetch("/api/reviews", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(actionCreateReview(review));
    };
};
//Read:
export const fetchReviewById = (Id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${Id}`)

    if (response.ok) {
        const review = await response.json();
        dispatch(actionReadReview(review));
    };
};

export const updateAReview = ({reviewId, reviewData}) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${reviewId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(actionUpdateReview(review));
    };
};
//TODO:
export const deleteAReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${reviewId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(actionDeleteReview(reviewId));
    }
}

//initialState
const initialState = {};

//reducer
const reviewsReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case LOAD_REVIEWS:{
            const allReviews = {};
            action.reviews.forEach( (review) => {
                allReviews[review.id] = review
            });
        return allReviews;
        }
        case CREATE_REVIEW: {
            const newState = { ...state }
            newState[action.spot.id] = action.spot
            return newState
        }
        case READ_REVIEW: {
            const newState = { ...state }
            newState[action.spotById.id] = action.spotById
            return newState
        }
        case UPDATE_REVIEW: {
            const newState = { ...state }
            newState[action.spot.id] = action.spot
            return newState
        }
        case DELETE_REVIEW: {
            const newState = { ...state }
            delete newState[action.spotId]
            return newState
        }
        default:
            return state;
    };
};

export default reviewsReducer;
