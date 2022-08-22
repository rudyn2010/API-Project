import { csrfFetch } from "./csrf";

//types
//get all
const LOAD_REVIEWS = 'reviews/getReviews';

const CREATE_REVIEW = 'reviews/createReview';
//get one by id
const READ_REVIEW = 'reviews/readReview';

const UPDATE_REVIEW = 'reviews/updateReview';

const DELETE_REVIEW = 'reviews/deleteReview';


//actionCreators
const loadReviews = () => {
    return {
        type: LOAD_REVIEWS
    }
}

const createReview = () => {
    return {
        type: CREATE_REVIEW
    };
};


const readReview = () => {
    return {
        type: READ_REVIEW
    };
};


const updateReview = () => {
    return {
        type: UPDATE_REVIEW
    };
};


const removeReview = () => {
    return {
        type: DELETE_REVIEW
    };
};


//thunks

//initialState
const initialState = { reviews: null };

//reducer
const reviewsReducer = ( state = initialState, action ) => {
    //let newState; (with Object.assign) or let newState = {};
    let newState = {};
    switch (action.type) {
        //normalizing data for initial store state
        case LOAD_REVIEWS:
        return ;

        default:
            return state;
    };
};

export default reviewsReducer;
