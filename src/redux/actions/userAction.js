import { ActionTypes } from "../constants/action-types";

export const addUserData = (user) => {
	return {
		type: ActionTypes.ADD_USER_DATA,
		payload: user,
	}
};

export const setTable = (user) => {
	return {
		type: ActionTypes.SET_TABLE,
		payload: user
	}
};

export const clearUser = () => {
	return {
		type: ActionTypes.CLEAR_USER
	}
};

export const deleteTable = (id) => {
	return {
		type: ActionTypes.DELETE_TABLE,
		payload: id
	}
};

export const updateTable = (user) => {
	return {
		type: ActionTypes.UPDATE_TABLE,
		payload: user
	}
}