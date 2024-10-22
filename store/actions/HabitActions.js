import {
	CREATE_HABIT,
	READ_HABIT,
	UPDATE_HABIT,
	DELETE_HABIT,
	GET_HABITS_FOR_USER,
	HABIT_ERROR,
	HABIT_SUCCESS,
	HABIT_LOADING,
	HABIT_FLAG
} from './types';

import axios from 'axios';
import { trackEvent } from '../../analytics/analytics';

export const createHabit = (habit) => {
	return (dispatch) => {
		const postVariables = {
			user_id: habit["user_id"],
			title: habit["title"],
			description: habit["description"],
			why: habit["why"],
			points: habit["points"]
		};

		axios.post('https://mindofhabit.com/api/app-habits/create', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: CREATE_HABIT, payload: response.data['habit'] });
				dispatch({ type: HABIT_FLAG, payload: 'create_habit_success' });
				trackEvent('EVENT_CREATE_HABIT_SUCCESS');
				dispatch({ type: HABIT_SUCCESS, payload: true });
				dispatch({ type: HABIT_LOADING, payload: false });
			} else {
				dispatch({ type: HABIT_FLAG, payload: 'create_habit_failure' });
				trackEvent('EVENT_CREATE_HABIT_FAILURE');
				dispatch({ type: HABIT_ERROR, payload: response.data['error'] });
				dispatch({ type: HABIT_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: HABIT_FLAG, payload: 'create_habit_failure' });
			trackEvent('EVENT_CREATE_HABIT_FAILURE');
			dispatch({ type: HABIT_ERROR, payload: error });
			dispatch({ type: HABIT_LOADING, payload: false });
		});
	};
};

export const readHabit = (habitID) => {
	return {
		type: READ_HABIT,
		payload: habitID
	};
};

export const updateHabit = (habit) => {
	return (dispatch) => {
		const postVariables = {
			habit_id: habit["id"],
			title: habit["title"],
			description: habit["description"],
			why: habit["why"],
			points: habit["points"],
			current_level: habit["current_level"]
		};

		axios.post('https://mindofhabit.com/api/app-habits/update', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: UPDATE_HABIT, payload: response.data['habit'] });

				// Directional data
				dispatch({ type: HABIT_FLAG, payload: 'update_habit_success' });
				dispatch({ type: HABIT_SUCCESS, payload: true });
				dispatch({ type: HABIT_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_UPDATE_HABIT_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: HABIT_FLAG, payload: 'update_habit_failure' });
				dispatch({ type: HABIT_ERROR, payload: response.data['error'] });
				dispatch({ type: HABIT_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_UPDATE_HABIT_FAILURE');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: HABIT_FLAG, payload: 'update_habit_failure' });
			dispatch({ type: HABIT_ERROR, payload: error });
			dispatch({ type: HABIT_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_UPDATE_HABIT_FAILURE');
		});
	};
};

export const deleteHabit = (habitID) => {
	return (dispatch) => {
		const postVariables = {
			habit_id: habitID
		};

		axios.post('https://mindofhabit.com/api/app-habits/delete', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: DELETE_HABIT, payload: habitID });

				// Directional data
				dispatch({ type: HABIT_FLAG, payload: 'delete_habit_success' });
				dispatch({ type: HABIT_SUCCESS, payload: true });
				dispatch({ type: HABIT_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_DELETE_HABIT_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: HABIT_FLAG, payload: 'delete_habit_failure' });
				dispatch({ type: HABIT_ERROR, payload: response.data['error'] });
				dispatch({ type: HABIT_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_DELETE_HABIT_FAILURE');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: HABIT_FLAG, payload: 'delete_habit_failure' });
			dispatch({ type: HABIT_ERROR, payload: error });
			dispatch({ type: HABIT_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_DELETE_HABIT_FAILURE');
		});
	};
};

export const getHabitsForUser = (userID) => {
	return (dispatch) => {
		axios.get('https://mindofhabit.com/api/app-habits/get-for-user?user_id=' + userID).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: GET_HABITS_FOR_USER, payload: response.data });

				// Directional data
				dispatch({ type: HABIT_FLAG, payload: 'get_habits_for_user_success' });
				dispatch({ type: HABIT_SUCCESS, payload: true });
				dispatch({ type: HABIT_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_GET_HABITS_FOR_USER_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: HABIT_FLAG, payload: 'get_habits_for_user_failure' });
				dispatch({ type: HABIT_ERROR, payload: response.data['error'] });
				dispatch({ type: HABIT_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_GET_HABITS_FOR_USER_FAILURE');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: HABIT_FLAG, payload: 'get_habits_for_user_failure' });
			dispatch({ type: HABIT_ERROR, payload: error });
			dispatch({ type: HABIT_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_GET_HABITS_FOR_USER_FAILURE');
		});
	};
};

export const habitError = (error) => {
	return {
		type: HABIT_ERROR,
		payload: error
	}
}

export const habitSuccess = (toggle) => {
	return {
		type: HABIT_SUCCESS ,
		payload: toggle
	};
};

export const habitLoading = (toggle) => {
	return {
		type: HABIT_LOADING,
		payload: toggle
	};
};

export const habitFlag = (flag) => {
	return {
		type: HABIT_FLAG,
		payload: flag
	};
};