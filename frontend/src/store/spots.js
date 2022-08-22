import { csrfFetch } from "./csrf";

//types
//get all
const LOAD_SPOTS = 'spots/getSpots';

const CREATE_SPOT = 'spots/createSpot';
//for getting a specific one by id
const READ_SPOT = 'spots/readSpot';

const UPDATE_SPOT = 'spots/updateSpot';

const DELETE_SPOT = 'spots/deleteSpot';


//actionCreators
const loadSpots = () => {
    return {
        type: LOAD_SPOTS
    };
};


const createSpot = () => {
    return {
        type: CREATE_SPOT
    };
};


const readSpot = () => {
    return {
        type: READ_SPOT
    };
};


const updateSpot = () => {
    return {
        type: UPDATE_SPOT
    };
};


const deleteSpot = () => {
    return {
        type: DELETE_SPOT
    };
};


//thunks

//initialState
const initialState = { spots: null };

//reducer
const spotsReducer = ( state = initialState, action ) => {
    //let newState; (with Object.assign) or let newState = {};
    let newState = {};
    switch (action.type) {
        //normalizing data for initial store state
        case LOAD_SPOTS:
        return ;

        default:
            return state;
    };
};

export default spotsReducer;
