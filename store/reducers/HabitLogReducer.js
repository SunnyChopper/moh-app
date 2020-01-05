import {
	CREATE_LOG,
	DELETE_LOG,
	GET_LOGS_FOR_USER,
	GET_LOGS_FOR_HABIT,
	GET_LOGS_FOR_LEVEL
} from '../actions/types';

const initialState = {
	current_habit_id: 0,
	current_level_id: 0,
	current_log_id: 0,
	logs: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_LOG:
			return {
				...state,
				logs: logs.push(action.payload)
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
				logs: action.payload
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
		default: return state;
	}
};