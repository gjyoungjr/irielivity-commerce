import userTypes from "./userTypes";
import { takeLatest, put, all, call } from "redux-saga/effects";

// utils
import {
  handleGetAllUsers,
  handleGetTotalUsers,
  handleSetUserAdmin,
} from "./userHelpers";
import { setAllUsers, setTotalUsers } from "./userActions";

export function* getAllUsers() {
  try {
    // assign users to data being returned from api call
    const users = yield handleGetAllUsers();
    // update redux store with all users
    yield put(setAllUsers(users));
  } catch (err) {
    console.log(err);
  }
}

export function* onGetAllUsersStart() {
  yield takeLatest(userTypes.GET_ALL_USERS, getAllUsers);
}

export function* getTotalUsers() {
  try {
    // assign users count to data being returned from fxn call
    const usersCount = yield handleGetTotalUsers();
    // update redux store with users count
    yield put(setTotalUsers(usersCount));
  } catch (err) {
    console.log(err);
  }
}

export function* onGetTotalUsersStart() {
  yield takeLatest(userTypes.GET_TOTAL_USERS, getTotalUsers);
}

export function* setAdminUser({ payload }) {
  try {
    const { userId, isAdmin } = payload;
    const timestamp = new Date();
    // update field in db
    yield handleSetUserAdmin(userId, {
      isAdmin: isAdmin,
      updatedAt: timestamp,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* onSetAdminUserStart() {
  yield takeLatest(userTypes.SET_ADMIN_USER, setAdminUser);
}

export default function* userSagas() {
  yield all([
    call(onGetAllUsersStart),
    call(onGetTotalUsersStart),
    call(onSetAdminUserStart),
  ]);
}
