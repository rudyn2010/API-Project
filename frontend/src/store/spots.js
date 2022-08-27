import { csrfFetch } from "./csrf";

//Types:
//get all
const LOAD_SPOTS = 'spots/getSpots';
const CREATE_SPOT = 'spots/createSpot';
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

const actionUpdateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
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
        return spot;
    };
    return response;
};
//Read:
export const fetchSpotById = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const spotById = await response.json();
        dispatch(actionReadSpot(spotById));
    };
};

export const updateASpot = ({spotId, spotData}) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotData)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(fetchSpotById(spotId));
    };
};

export const deleteASpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(actionDeleteSpot(spotId));
    }
    return response;
}

export const getCurrentUsersSpot = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/current`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionLoadSpots(data.Spots))
    }
}

//add Preview Image Feature:
export const addImageToSpot = (spotId, imgUrl) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(imgUrl)
    });
    return response;
}

//initialState
const initialState = {};

//Reducer
const spotsReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const allSpots = {};
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
            newState[action.spot.id] = action.spot
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
