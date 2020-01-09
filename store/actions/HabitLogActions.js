import {
	CREATE_LOG,
	DELETE_LOG,
	GET_LOGS_FOR_USER,
	GET_LOGS_FOR_HABIT,
	GET_LOGS_FOR_LEVEL,
	LOG_ERROR,
	LOG_SUCCESS,
	LOG_LOADING
} from './types';

import axios from 'axios';

export const createLog = (log) => {
	return (dispatch) => {
		console.log('[LOG] - createLog function called upon within `HabitLogActions`.');
		const postVariables = {
			user_id: log["user_id"],
			habit_id: log["habit_id"],
			level_id: log["level_id"]
		};

		console.log('[LOG] - createLog created variable `postVariables`.');
		console.log('[DATA DUMP]');
		console.log(postVariables);

		axios.post('https://mindofhabit.com/api/app-habit-logs/create', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				console.log('[LOG] - createLog function successfully executed on API.');
				console.log('[DATA DUMP]');
				console.log(response.data);
				dispatch({ type: CREATE_LOG, payload: response.data['log'] });
				dispatch({ type: LOG_SUCCESS, payload: true });
				dispatch({ type: LOG_LOADING, payload: false });
			} else {
				console.log('[LOG] - createLog function failed executed on API.');
				console.log('[DATA DUMP]');
				console.log(response.data['error']);
				dispatch({ type: LOG_ERROR, payload: response.data['error'] });
				dispatch({ type: LOG_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: LOG_ERROR, payload: error });
		});
	};
};

export const deleteLog = (logID) => {
	return (dispatch) => {
		const postVariables = {
			log_id: logID
		};

		axios.post('https://mindofhabit.com/api/app-habit-logs/delete', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: DELETE_LOG, payload: logID });
				dispatch({ type: LOG_SUCCESS, payload: true });
			} else {
				dispatch({ type: LOG_ERROR, payload: response.data['error'] });
			}
		}).catch(function(error) {
			dispatch({ type: LOG_ERROR, payload: error });
		});
	};
};

export const getLogsForUser = (userID) => {
	return (dispatch) => {
		axios.get('https://mindofhabit.com/api/app-habit-logs/get-for-user?user_id=' + userID).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: GET_LOGS_FOR_USER, payload: response.data });
				dispatch({ type: LOG_SUCCESS, payload: true });
			} else {
				dispatch({ type: LOG_ERROR, payload: response.data['error'] });
			}
		}).catch(function(error) {
			dispatch({ type: LOG_ERROR, payload: error });
		});
	};
};

export const getLogsForHabit = (habitID) => {
	return {
		type: GET_LOGS_FOR_HABIT,
		payload: habitID
	};
};

export const getLogsForLevel = (levelID) => {
	return {
		type: GET_LOGS_FOR_LEVEL,
		payload: levelID
	};
};

export const logError = (error) => {
	return {
		type: LOG_ERROR,
		payload: error
	};
};

export const logSuccess = (toggle) => {
	return {
		type: LOG_SUCCESS,
		payload: toggle
	};
};

export const logLoading = (toggle) => {
	return {
		type: LOG_LOADING,
		payload: toggle
	};
};