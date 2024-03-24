import { ActionTypes } from "../constants/action-types"

const initialState = {
	user: {},
	usersTable: [],
}

export const userReducer = (state = initialState, {type, payload}) => {
	switch(type) {
		case ActionTypes.ADD_USER_DATA:
			return { ...state, user: { ...state.user, ...payload } };
		case ActionTypes.SET_TABLE:
			return { ...state, usersTable: [ ...state.usersTable, payload ] };
		case ActionTypes.CLEAR_USER:
			return { ...state, user: {} };
		case ActionTypes.DELETE_TABLE:
			return { ...state, usersTable: state.usersTable.filter(data => data.userId !== payload) };
		case ActionTypes.UPDATE_TABLE:
			return { ...state, usersTable: state.usersTable.map(ele => ele.userId === payload.userId ? payload : ele) }
		default:
			return state;
	}
}