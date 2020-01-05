import {
	CREATE_LOG,
	DELETE_LOG,
	GET_LOGS_FOR_USER,
	GET_LOGS_FOR_HABIT,
	GET_LOGS_FOR_LEVEL
} from './types';

import axios from 'axios';

export default createLog = (log) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-habit-logs/create', {log}).then(function(response) {
			dispatch({ type: CREATE_LOG, payload: log });
		});
	};
};

export default deleteLog = (logID) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-habit-logs/delete', {log}).then(function(response) {
			dispatch({ type: DELETE_LOG, payload: logID });
		});
	};
};

export default getLogsForUser = (userID) => {
	return (dispatch) => {
		axios.get('https://mindofhabit.com/api/app-habit-logs/get-for-user?userID=' + userID).then(function(response) {
			dispatch({ type: GET_LOGS_FOR_USER, payload: response });
		});
	};
};

export default getLogsForHabit = (habitID) => {
	return {
		type: GET_LOGS_FOR_HABIT,
		payload: habitID
	};
};

export default getLogsForLevel = (levelID) => {
	return {
		type: GET_LOGS_FOR_LEVEL,
		payload: levelID
	};
};