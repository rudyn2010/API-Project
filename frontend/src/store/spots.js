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
        spots
    };
};

const actionCreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    };
};

const actionReadSpot = (spotById) => {
    return {
        type: READ_SPOT,
        spotById
    };
};

const actionUpdateSpot = () => {
    return {
        type: UPDATE_SPOT
    };
};

const actionDeleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    };
};


//Thunks:
export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");

    if (response.ok) {
        const data = await response.json();
        dispatch(actionLoadSpots(data.Spots));
        // return spots;
    };
};

export const createASpot = (spotData) => async (dispatch) => {
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotData)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(actionCreateSpot(spot));
    };
};
//Read:
export const fetchSpotById = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

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
export const deleteASpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(actionDeleteSpot(spotId));
    }
}

//initialState
const initialState = {};

//Reducer
const spotsReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const allSpots = {}
            action.spots.forEach( (spot) => {
                allSpots[spot.id] = spot
            });
            return allSpots;
        }
        case CREATE_SPOT: {
            const newState = { ...state }
            newState[action.spot.id] = action.spot
            return newState
        }
        case READ_SPOT: {
            const newState = { ...state }
            newState[action.spotById.id] = action.spotById
            return newState
        }
        case UPDATE_SPOT: {
            const newState = { ...state }
            // newState[action.] = action.
            return newState
        }
        case DELETE_SPOT: {
            const newState = { ...state }
            delete newState[action.spotId]
            return newState
        }
        default:
            return state;
    };
};

export default spotsReducer;
