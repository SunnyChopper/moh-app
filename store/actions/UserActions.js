import {
	CREATE_USER,
	LOGIN_USER,
	UPDATE_USER,
	DELETE_USER,
	REDEEM_REWARD
} from './types';

import axios from 'axios';

export const createUser = (user) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-users/create', {user}).then(function(response) {
			dispatch({ type: CREATE_USER, payload: user });
		});
	};
};

export const loginUser = (email, password) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-users/login', {email, password}).then(function(response) {
			dispatch({ type: LOGIN_USER, payload: response });
		});
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

export const redeemReward = (rewardID, userID) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-rewards/redeem', { reward_id: rewardID, user_id: userID }).then(function(response) {
			dispatch({ type: GET_REWARDS_FOR_USER, payload: response });
		});
	};
};