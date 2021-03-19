import userTypes from "./userTypes";

// set state to null by default
const INITIAL_STATE = {
  currentUser: null,
  users: [],
  totalUsers: [],
};

// update user state with payload
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.SET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case userTypes.SET_TOTAL_USERS:
      return {
        ...state,
        totalUsers: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
