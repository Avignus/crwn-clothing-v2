import { USER_ACTION_TYPES } from "./user.types";
import { AnyAction } from "redux";
import {
  signInFailed,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
  signInSuccess,
  signUpSuccess,
} from "./user.action";
import { UserData } from "../../utils/firebase/firebase.utils";

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};
export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  const { payload } = action;
  console.log("dispatched");
  console.log(action);

  if (
    signUpFailed.match(action) ||
    signOutFailed.match(action) ||
    signInFailed.match(action)
  ) {
    return {
      ...state,
      error: payload,
    };
  }

  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: payload,
    };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    };
  }

  return state;
};
