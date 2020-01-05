import {
	CREATE_USER,
	LOGIN_USER,
	UPDATE_USER,
	DELETE_USER,
	REDEEM_REWARD
} from '../actions/types';

const initialState = {
	current_user_id: 0,
	current_user: [],
	is_logged_in: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_USER:
			return {
				...state,
				current_user_id: action.payload.id,
				current_user: action.payload,
				is_logged_in: true
			};
		case LOGIN_USER:
			return {
				...state,
				current_user_id: action.payload.id,
				current_user: action.payload,
				is_logged_in: true
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
		case REDEEM_REWARD:
			return {
				...state,
				current_user: action.payload
			};
		default: return state;
	}
};