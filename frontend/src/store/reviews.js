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

const actionCreateReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    };
};

const actionReadReview = (reviews) => {
    return {
        type: READ_REVIEW,
        reviews
    };
};

//Update not needed - for now...
// const actionUpdateReview = () => {
//     return {
//         type: UPDATE_REVIEW
//     };
// };

const actionDeleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
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

export const createAReviewForSpot = ({reviewData, spotId}) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(actionCreateReview(review));
    };
};

export const fetchReviewBySpotId = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionReadReview(data.Reviews));
    };
};

export const fetchReviewsOfCurrUser = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionReadReview(data.Reviews));
    }
}

// export const updateAReview = ({reviewId, reviewData}) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/${reviewId}`, {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(reviewData)
//     });

//     if (response.ok) {
//         const review = await response.json();
//         dispatch(actionUpdateReview(review));
//     };
// };
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
            newState[action.review.id] = action.review
            return newState
        }
        //Read reviews returns an array -> normalize forEach
        case READ_REVIEW: {
            const newState = {}
            action.reviews.forEach( (review) => {
                newState[review.id] = review
            })
            return newState
        }
        // case UPDATE_REVIEW: {
        //     const newState = { ...state }
        //     newState[action.spot.id] = action.spot
        //     return newState
        // }
        case DELETE_REVIEW: {
            const newState = { ...state }
            delete newState[action.reviewId]
            return newState
        }
        default:
            return state;
    };
};

export default reviewsReducer;
