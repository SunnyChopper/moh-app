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
} from './types';

import axios from 'axios';

export const createUser = (user) => {
	const postVariables = {
		first_name: user["first_name"],
		last_name: user["last_name"],
		email: user["email"],
		password: user["password"]
	};

	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-users/create', {postVariables}, {
			"headers": {
				'Content-Type': 'application/json',
			}
		}).then(function(response) {
			if (response.data['success'] == false) {
				dispatch({ type: ERROR_LOGGING_IN, payload: response.data['error'] });
			} else {
				dispatch({ type: CREATE_USER, payload: response.data });
			}
		}).catch(function(error) {
			console.log("Error while creating user with API...");
			console.log(error);
		});
	};
};

export const errorLoggingIn = (error) => {
	return {
		type: ERROR_LOGGING_IN,
		payload: error
	};
};

export const clearError = () => {
	return {
		type: CLEAR_ERROR,
		payload: ''
	};
}

export const loginUser = (email, password) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-users/login', {email, password}).then(function(response) {
			if (response.data['success'] == false) {
				console.log('Failed to login...');
				console.log(response.data["error"]);
				dispatch({ type: ERROR_LOGGING_IN, payload: response.data['error'] });
			} else {
				dispatch({ type: LOGIN_USER, payload: response.data });
			}
		});
	};
};

export const logoutUser = () => {
	return {
		type: LOGOUT_USER,
		payload: false
	};
};

export const updateUser = (user) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-users/update', {user}).then(function(response) {
			dispatch({ type: UPDATE_USER, payload: user });
		});
	};
};

export const deleteUser = (userID) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-users/delete', {user_id: userID}).then(function(response) {
			dispatch({ type: DELETE_USER, payload: response });
		});
	};
};

export const overwriteUser = (user) => {
	return {
		type: OVERWRITE_USER,
		payload: user
	};
};

export const redeemReward = (rewardID, userID) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-rewards/redeem', { reward_id: rewardID, user_id: userID }).then(function(response) {
			dispatch({ type: GET_REWARDS_FOR_USER, payload: response });
		});
	};
};