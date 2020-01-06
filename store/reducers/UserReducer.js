import {
	CREATE_USER,
	LOGIN_USER,
	LOGOUT_USER,
	ERROR_LOGGING_IN,
	CLEAR_ERROR,
	UPDATE_USER,
	DELETE_USER,
	OVERWRITE_USER,
	REDEEM_REWARD
} from '../actions/types';

const initialState = {
	current_user_id: 0,
	current_user: [],
	error: '',
	is_logged_in: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_USER:
			return {
				...state,
				current_user_id: action.payload.data['user']['id'],
				current_user: action.payload.data['user'],
				is_logged_in: true,
				error: ''
			};
		case LOGIN_USER:
			return {
				...state,
				current_user_id: action.payload['user']['id'],
				current_user: action.payload['user'],
				is_logged_in: true,
				error: ''
			};
		case LOGOUT_USER:
			return {
				...state,
				current_user_id: 0,
				current_user: [],
				is_logged_in: false,
				error: ''
			};
		case ERROR_LOGGING_IN:
			return {
				...state,
				error: action.payload
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: ''
			};
		case UPDATE_USER:
			return {
				...state,
				current_user: action.payload
			};
		case DELETE_USER:
			return {
				...state,
				current_user_id: 0,
				current_user: [],
				is_logged_in: false
			};
		case OVERWRITE_USER:
			return {
				...state,
				current_user_id: action.payload['id'],
				current_user: action.payload,
				is_logged_in: true,
				error: ''
			};
		case REDEEM_REWARD:
			return {
				...state,
				current_user: action.payload
			};
		default: return state;
	}
};