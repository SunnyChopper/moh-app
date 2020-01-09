import {
	CREATE_USER,
	LOGIN_USER,
	LOGOUT_USER,
	CLEAR_ERROR,
	UPDATE_USER,
	DELETE_USER,
	OVERWRITE_USER,
	REDEEM_REWARD,
	GET_USER,
	GET_USER_POINTS,
	USER_ERROR,
	USER_SUCCESS,
	USER_LOADING,
	USER_FLAG
} from '../actions/types';

const initialState = {
	current_user_id: 0,
	current_user: [],
	error: '',
	success: false,
	loading: false,
	flag: '',
	points: 0,
	is_logged_in: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_USER:
			return {
				...state,
				current_user_id: action.payload.data['user']['id'],
				current_user: action.payload.data['user'],
				points: action.payload.data['user']['points'],
				is_logged_in: true,
				error: ''
			};
		case LOGIN_USER:
			return {
				...state,
				current_user_id: action.payload['id'],
				current_user: action.payload,
				points: action.payload['points'],
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
				points: action.payload['points'],
				is_logged_in: true,
				error: ''
			};
		case REDEEM_REWARD:
			return {
				...state,
				current_user: action.payload,
				points: action.payload['points']
			};
		case GET_USER:
			console.log('[LOG] - Within GET_USER function in `UserReducer`');
			console.log('[DATA DUMP] - `action.payload` = ' + action.payload);
			return {
				...state,
				current_user_id: action.payload['id'],
				current_user: action.payload,
				points: action.payload['points'],
				is_logged_in: true
			};
		case GET_USER_POINTS:
			return {
				...state,
				points: action.payload
			};
		case USER_ERROR:
			return {
				...state, 
				error: action.payload
			};
		case USER_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case USER_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case USER_FLAG:
			return {
				...state,
				flag: action.payload
			};
		default: return state;
	}
};