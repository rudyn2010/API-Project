import { csrfFetch } from './csrf';

/* Template format for most reducers - needs general 4 things */
// Dan's philosphy to have one actionCreator for one crud feature

//types
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';


//actionCreators
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

//thunks
export const login = (validUser) => async (dispatch) => {
    //must match the data values coming from the backend
  const { credential, password } = validUser;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();

  console.log(data)

  dispatch(setUser(data.validUser));
  return response;
};

const initialState = { user: null };

//reducer
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
