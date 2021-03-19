import userTypes from "./userTypes";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const getAllUsers = () => ({
  type: userTypes.GET_ALL_USERS,
});

export const setAllUsers = (users) => ({
  type: userTypes.SET_ALL_USERS,
  payload: users,
});

export const getTotalUsers = () => ({
  type: userTypes.GET_TOTAL_USERS,
});
export const setTotalUsers = (usersCount) => ({
  type: userTypes.SET_TOTAL_USERS,
  payload: usersCount,
});
