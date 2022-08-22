import { csrfFetch } from "./csrf";

//Types:
//get all
const LOAD_SPOTS = 'spots/getSpots';
const CREATE_SPOT = 'spots/createSpot';
//for getting a specific one by id
const READ_SPOT = 'spots/readSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';


//ActionCreators:
const actionLoadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        payload: spots
    };
};

const actionCreateSpot = () => {
    return {
        type: CREATE_SPOT
    };
};

const actionReadSpot = () => {
    return {
        type: READ_SPOT
    };
};

const actionUpdateSpot = () => {
    return {
        type: UPDATE_SPOT
    };
};

const actionDeleteSpot = () => {
    return {
        type: DELETE_SPOT
    };
};


//Thunks:
export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        dispatch(actionLoadSpots(spots));
        // return spots;
    };
};

export const createASpot = (newSpot) => async (dispatch) => {
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSpot)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionCreateSpot(data));
    };
};
//Read:
export const fetchSpotById = () => async (dispatch) => {
    const response = await csrfFetch('api/spots/:spotId')

    if (response.ok) {
        const spotById = await response.json();
        dispatch(actionReadSpot(spotById));

    };
};

export const updateASpot = (spotById) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotById.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotById)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(actionUpdateSpot(spot));
    };
};
//TODO:
export const deleteASpot = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${example}`, {
        method: "DELETE",
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(actionDeleteSpot(spot));
    }
}

//initialState
const initialState = { spots: null };

//Reducer
const spotsReducer = ( state = initialState, action ) => {
    //let newState; (with Object.assign) or let newState = {};
    const newState = {};
    switch (action.type) {
        //normalizing data for initial store state
        case LOAD_SPOTS: {
            action.payload.forEach( spot => {
                newState[spot.id] = spot
            });
        return newState;
        }

        default:
            return state;
    };
};

export default spotsReducer;
