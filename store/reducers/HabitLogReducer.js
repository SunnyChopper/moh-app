import {
	CREATE_LOG,
	DELETE_LOG,
	GET_LOGS_FOR_USER,
	GET_LOGS_FOR_HABIT,
	GET_LOGS_FOR_LEVEL,
	LOG_ERROR,
	LOG_SUCCESS,
	LOG_LOADING,
	LOG_FLAG
} from '../actions/types';

const initialState = {
	current_habit_id: 0,
	current_level_id: 0,
	current_log_id: 0,
	logs: {},
	log_ids: [],
	error: '',
	success: false,
	loading: false,
	flag: ''
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_LOG:
			console.log('[LOG] - CREATE_LOG function called upon within `HabitLogReducer`.');
			const createLogs = state.logs;
			createLogs[action.payload['id']] = action.payload;
			
			return {
				...state,
				logs: createLogs
			};
		case DELETE_LOG:
			const newLogs = state.logs;
			for (var i = 0; i < newLogs.length; i++) {
				if (newLogs[i].id == action.payload) {
					newLogs.splice(i, 1);
				}
			}

			return {
				...state,
				logs: newLogs
			};
		case GET_LOGS_FOR_USER:
			return {
				...state,
				logs: action.payload['logs'],
				log_ids: action.payload['log_ids']
			};
		case GET_LOGS_FOR_HABIT:
			return {
				...state,
				current_habit_id: action.payload
			};
		case GET_LOGS_FOR_LEVEL:
			return {
				...state,
				current_level_id: action.payload
			};
		case LOG_ERROR:
			return {
				...state,
				error: action.payload
			};
		case LOG_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case LOG_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case LOG_FLAG:
			return {
				...state,
				flag: action.payload
			};
		default: return state;
	}
};