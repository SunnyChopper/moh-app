import {
	CREATE_REWARD,
	READ_REWARD,
	UPDATE_REWARD,
	DELETE_REWARD,
	REDEEM_REWARD,
	GET_REWARDS_FOR_USER
} from './types';

import axios from 'axios';

export const createReward = (reward) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-rewards/create', {reward}).then(function(response) {
			dispatch({ type: CREATE_REWARD, payload: reward });
		});
	};
};

export const readReward = (rewardID) => {
	return {
		type: READ_REWARD,
		payload: rewardID
	};
};

export const updateReward = (reward) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-rewards/update', {reward}).then(function(response) {
			dispatch({ type: UPDATE_REWARD, payload: reward });
		});
	};
};

export const deleteReward = (rewardID) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-rewards/delete', { reward_id: rewardID }).then(function(response) {
			dispatch({ type: DELETE_REWARD, payload: rewardID });
		});
	};
};

export const getRewardsForUser = (userID) => {
	return (dispatch) => {
		axios.get('https://mindofhabit.com/api/app-reward/get-for-user?userID=' + userID).then(function(response) {
			dispatch({ type: GET_REWARDS_FOR_USER, payload: response });
		});
	};
};