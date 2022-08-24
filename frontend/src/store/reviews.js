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


//Thunks
export const fetchReviews = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews');

    if (response.ok) {
        const reviews = response.json();
        dispatch(actionLoadReviews(reviews))
        // return reviews;
    };
};

//initialState
const initialState = {};

//reducer
const reviewsReducer = ( state = initialState, action ) => {
    //let newState; (with Object.assign) or let newState = {};
    let newState = {};
    switch (action.type) {
        case LOAD_REVIEWS:{
            action.reviews.forEach( (review) => {
                newState[review.id] = review
            });
        return newState;
        }

        default:
            return state;
    };
};

export default reviewsReducer;
