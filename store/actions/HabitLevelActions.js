import {
	CREATE_LEVEL,
	READ_LEVEL,
	UPDATE_LEVEL,
	DELETE_LEVEL,
	GET_LEVELS_FOR_USER,
	GET_LEVELS_FOR_HABIT,
	LEVEL_ERROR,
	LEVEL_SUCCESS,
	LEVEL_LOADING,
	LEVEL_FLAG
} from './types';

import axios from 'axios';

export const createLevel = (level) => {
	return (dispatch) => {
		const postVariables = {
			user_id: level["user_id"],
			habit_id: level["habit_id"],
			title: level["title"],
			description: level["description"]
		};

		axios.post('https://mindofhabit.com/api/app-habit-levels/create', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: LEVEL_FLAG, payload: 'create_level_success'});
				dispatch({ type: CREATE_LEVEL, payload: response.data['level'] });
				dispatch({ type: LEVEL_SUCCESS, payload: true});
				dispatch({ type: LEVEL_LOADING, payload: false});
			} else {
				dispatch({ type: LEVEL_FLAG, payload: 'create_level_failure'});
				dispatch({ type: LEVEL_ERROR, payload: response.data['error'] });
				dispatch({ type: LEVEL_LOADING, payload: false});
			}
		}).catch(function(error) {
			dispatch({ type: LEVEL_FLAG, payload: 'create_level_failure'});
			dispatch({ type: LEVEL_ERROR, payload: error });
			dispatch({ type: LEVEL_LOADING, payload: false});
		});
	};
};

export const readLevel = (levelID) => {
	return {
		type: READ_LEVEL,
		payload: levelID
	};
};

export const updateLevel = (level) => {
	return (dispatch) => {
		const postVariables = {
			level_id: level["level_id"],
			title: level["title"],
			description: level["description"],
			order: level["order"]
		};

		axios.post('https://mindofhabit.com/api/app-habit-levels/update', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: LEVEL_FLAG, payload: 'update_level_success'});
				dispatch({ type: UPDATE_LEVEL, payload: response.data['level'] });
				dispatch({ type: LEVEL_SUCCESS, payload: true});
				dispatch({ type: LEVEL_LOADING, payload: false});
			} else {
				dispatch({ type: LEVEL_FLAG, payload: 'update_level_failure'});
				dispatch({ type: LEVEL_ERROR, payload: response.data['error'] });
				dispatch({ type: LEVEL_LOADING, payload: false})
			}
		}).catch(function(error) {
			dispatch({ type: LEVEL_FLAG, payload: 'update_level_failure'});
			dispatch({ type: LEVEL_ERROR, payload: error });
			dispatch({ type: LEVEL_LOADING, payload: false});
		});
	};
};

export const deleteLevel = (levelID) => {
	return (dispatch) => {
		const postVariables = {
			level_id: levelID
		};

		axios.post('https://mindofhabit.com/api/app-habit-levels/delete', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: LEVEL_FLAG, payload: 'delete_level_success'});
				dispatch({ type: DELETE_LEVEL, payload: levelID });
				dispatch({ type: LEVEL_SUCCESS, payload: true});
				dispatch({ type: LEVEL_LOADING, payload: false});
			} else {
				dispatch({ type: LEVEL_FLAG, payload: 'delete_level_failure'});
				dispatch({ type: LEVEL_ERROR, payload: response.data['error'] });
				dispatch({ type: LEVEL_LOADING, payload: false})
			}
		}).catch(function(error) {
			dispatch({ type: LEVEL_FLAG, payload: 'delete_level_failure'});
			dispatch({ type: LEVEL_ERROR, payload: error });
			dispatch({ type: LEVEL_LOADING, payload: false});
		});
	};
};

export const getLevelsForUser = (userID) => {
	return (dispatch) => {
		axios.get('https://mindofhabit.com/api/app-habit-levels/get-for-user?user_id=' + userID).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: LEVEL_FLAG, payload: 'get_levels_for_user_success'});
				dispatch({ type: GET_LEVELS_FOR_USER, payload: response['levels'] });
				dispatch({ type: LEVEL_SUCCESS, payload: true});
				dispatch({ type: LEVEL_LOADING, payload: false});
			} else {
				dispatch({ type: LEVEL_FLAG, payload: 'get_levels_for_user_failure'});
				dispatch({ type: LEVEL_ERROR, payload: response.data['error'] });
				dispatch({ type: LEVEL_LOADING, payload: false})
			}
		}).catch(function(error) {
			dispatch({ type: LEVEL_FLAG, payload: 'get_levels_for_user_failure'});
			dispatch({ type: LEVEL_ERROR, payload: error });
			dispatch({ type: LEVEL_LOADING, payload: false});
		});
	};
};

export const getLevelsForHabit = (habitID) => {
	return (dispatch) => {
		axios.get('https://mindofhabit.com/api/app-habit-levels/get-for-habit?habit_id=' + habitID).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: LEVEL_FLAG, payload: 'get_levels_for_habit_success'});
				dispatch({ type: GET_LEVELS_FOR_HABIT, payload: response.data });
				dispatch({ type: LEVEL_SUCCESS, payload: true });
				dispatch({ type: LEVEL_LOADING, payload: false});
			} else {
				dispatch({ type: LEVEL_FLAG, payload: 'get_levels_for_habit_failure'});
				dispatch({ type: LEVEL_ERROR, payload: response.data['error'] });
				dispatch({ type: LEVEL_LOADING, payload: false})
			}
		}).catch(function(error) {
			dispatch({ type: LEVEL_FLAG, payload: 'get_levels_for_habit_failure'});
			dispatch({ type: LEVEL_ERROR, payload: error });
			dispatch({ type: LEVEL_LOADING, payload: false});
		});
	}
}

export const levelError = (error) => {
	return {
		type: LEVEL_ERROR,
		payload: error
	};
};

export const levelSuccess = (toggle) => {
	return {
		type: LEVEL_SUCCESS,
		payload: toggle
	};
};

export const levelLoading = (toggle) => {
	return {
		type: LEVEL_LOADING,
		payload: toggle
	};
};

export const levelFlag = (flag) => {
	return {
		type: LEVEL_FLAG,
		payload: flag
	};
};