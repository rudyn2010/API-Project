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
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        payload: spots
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
export const fetchSpots = () => async (dispatch) => {
    //TODO: check which route the fetch is happening with our db
    const response = await fetch('/');
    const spots = response.json();
    dispatch(loadSpots(spots))
}

//initialState
const initialState = { spots: null };

//reducer
const spotsReducer = ( state = initialState, action ) => {
    //let newState; (with Object.assign) or let newState = {};
    const newState = {};
    switch (action.type) {
        //normalizing data for initial store state
        case LOAD_SPOTS:
            action.payload.forEach( spot => {
                newState[spot.id] = spot
            });
        return newState;

        default:
            return state;
    };
};

export default spotsReducer;
