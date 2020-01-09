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
} from './types';

import axios from 'axios';
import { trackEvent } from '../../analytics/analytics';

export const createLog = (log) => {
	return (dispatch) => {
		const postVariables = {
			user_id: log["user_id"],
			habit_id: log["habit_id"],
			level_id: log["level_id"]
		};

		axios.post('https://mindofhabit.com/api/app-habit-logs/create', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: CREATE_LOG, payload: response.data['log'] });

				// Directional data
				dispatch({ type: LOG_SUCCESS, payload: true });
				dispatch({ type: LOG_LOADING, payload: false });
				dispatch({ type: LOG_FLAG, payload: 'create_log_success' });

				// Analytics
				trackEvent('EVENT_CREATE_LOG_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: LOG_ERROR, payload: response.data['error'] });
				dispatch({ type: LOG_LOADING, payload: false });
				dispatch({ type: LOG_FLAG, payload: 'create_log_failure' });

				// Analytics
				trackEvent('EVENT_CREATE_LOG_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: LOG_ERROR, payload: error });
			dispatch({ type: LOG_LOADING, payload: false });
			dispatch({ type: LOG_FLAG, payload: 'create_log_failure' });

			// Analytics
			trackEvent('EVENT_CREATE_LOG_FAILED');
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
				// Payload
				dispatch({ type: DELETE_LOG, payload: logID });

				// Directional data
				dispatch({ type: LOG_SUCCESS, payload: true });
				dispatch({ type: LOG_LOADING, payload: false });
				dispatch({ type: LOG_FLAG, payload: 'delete_log_success' });

				// Analytics
				trackEvent('EVENT_DELETE_LOG_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: LOG_ERROR, payload: response.data['error'] });
				dispatch({ type: LOG_LOADING, payload: false });
				dispatch({ type: LOG_FLAG, payload: 'delete_log_failure' });

				// Analytics
				trackEvent('EVENT_DELETE_LOG_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: LOG_ERROR, payload: error });
			dispatch({ type: LOG_LOADING, payload: false });
			dispatch({ type: LOG_FLAG, payload: 'delete_log_failure' });

			// Analytics
			trackEvent('EVENT_DELETE_LOG_FAILED');
		});
	};
};

export const getLogsForUser = (userID) => {
	return (dispatch) => {
		axios.get('https://mindofhabit.com/api/app-habit-logs/get-for-user?user_id=' + userID).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: GET_LOGS_FOR_USER, payload: response.data });

				// Directional data
				dispatch({ type: LOG_SUCCESS, payload: true });
				dispatch({ type: LOG_LOADING, payload: false });
				dispatch({ type: LOG_FLAG, payload: 'get_logs_for_user_success' });

				// Analytics
				trackEvent('GET_LOGS_FOR_USER_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: LOG_ERROR, payload: response.data['error'] });
				dispatch({ type: LOG_LOADING, payload: false });
				dispatch({ type: LOG_FLAG, payload: 'get_logs_for_user_failure' });

				// Analytics
				trackEvent('GET_LOGS_FOR_USER_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: LOG_ERROR, payload: error });
			dispatch({ type: LOG_LOADING, payload: false });
			dispatch({ type: LOG_FLAG, payload: 'delete_log_failure' });

			// Analytics
			trackEvent('GET_LOGS_FOR_USER_FAILED');
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

export const logFlag = (flag) => {
	return {
		type: LOG_FLAG,
		payload: flag
	}
};