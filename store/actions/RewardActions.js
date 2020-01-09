import {
	CREATE_REWARD,
	READ_REWARD,
	UPDATE_REWARD,
	DELETE_REWARD,
	REDEEM_REWARD,
	GET_REWARDS_FOR_USER,
	REWARD_ERROR,
	REWARD_SUCCESS,
	REWARD_LOADING,
	REWARD_FLAG
} from './types';

import axios from 'axios';
import { trackEvent } from '../../analytics/analytics';

export const createReward = (reward) => {
	return (dispatch) => {
		const postVariables = {
			user_id: reward["user_id"],
			title: reward["title"],
			description: reward["description"],
			points: reward["points"]
		};

		axios.post('https://mindofhabit.com/api/app-rewards/create', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: CREATE_REWARD, payload: response.data['reward'] });

				// Directional data
				dispatch({ type: REWARD_FLAG, payload: 'create_reward_success' });
				dispatch({ type: REWARD_SUCCESS, payload: true });
				dispatch({ type: REWARD_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_CREATE_REWARD_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: REWARD_FLAG, payload: 'create_reward_failure' });
				dispatch({ type: REWARD_ERROR, payload: response.data['error'] });
				dispatch({ type: REWARD_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_CREATE_REWARD_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: REWARD_FLAG, payload: 'create_reward_failure' });
			dispatch({ type: REWARD_ERROR, payload: error });
			dispatch({ type: REWARD_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_CREATE_REWARD_FAILED');
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
		const postVariables = {
			reward_id: reward["id"],
			title: reward["title"],
			description: reward["description"],
			points: reward["points"]
		};

		axios.post('https://mindofhabit.com/api/app-rewards/update', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: UPDATE_REWARD, payload: postVariables });

				// Directional data
				dispatch({ type: REWARD_FLAG, payload: 'update_reward_success' });
				dispatch({ type: REWARD_SUCCESS, payload: true });
				dispatch({ type: REWARD_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_UPDATE_REWARD_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: REWARD_FLAG, payload: 'update_reward_failure' });
				dispatch({ type: REWARD_ERROR, payload: response.data['error'] });
				dispatch({ type: REWARD_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_UPDATE_REWARD_FAILED');
			}
		}).catch(function(error) {
			// Payload
			dispatch({ type: REWARD_FLAG, payload: 'update_reward_failure' });
			dispatch({ type: REWARD_ERROR, payload: error });
			dispatch({ type: REWARD_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_UPDATE_REWARD_FAILED');
		});
	};
};

export const deleteReward = (rewardID) => {
	return (dispatch) => {
		console.log('[LOG] - Calling `deleteReward` from `RewardActions`');
		const postVariables = {
			reward_id: rewardID
		};

		axios.post('https://mindofhabit.com/api/app-rewards/delete', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: DELETE_REWARD, payload: rewardID });

				// Directional data
				dispatch({ type: REWARD_FLAG, payload: 'delete_reward_success' });
				dispatch({ type: REWARD_SUCCESS, payload: true });
				dispatch({ type: REWARD_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_DELETE_REWARD_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: REWARD_FLAG, payload: 'delete_reward_failure' });
				dispatch({ type: REWARD_ERROR, payload: response.data['error'] });
				dispatch({ type: REWARD_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_DELETE_REWARD_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: REWARD_FLAG, payload: 'delete_reward_failure' });
			dispatch({ type: REWARD_ERROR, payload: error });
			dispatch({ type: REWARD_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_DELETE_REWARD_FAILED');
		});
	};
};

export const redeemReward = (rewardID, userID) => {
	return (dispatch) => {
		const postVariables = {
			reward_id: rewardID,
			user_id: userID
		};

		axios.post('https://mindofhabit.com/api/app-rewards/redeem', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				// Directional data
				dispatch({ type: REWARD_FLAG, payload: 'redeem_reward_success' });
				dispatch({ type: REWARD_SUCCESS, payload: true });
				dispatch({ type: REWARD_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_REDEEM_REWARD_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: REWARD_FLAG, payload: 'delete_reward_failure' });
				dispatch({ type: REWARD_ERROR, payload: response.data['error'] });
				dispatch({ type: REWARD_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_REDEEM_REWARD_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: REWARD_FLAG, payload: 'redeem_reward_failure' });
			dispatch({ type: REWARD_ERROR, payload: error });
			dispatch({ type: REWARD_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_REDEEM_REWARD_FAILED');
		});
	};
};

export const getRewardsForUser = (userID) => {
	return (dispatch) => {
		axios.get('https://mindofhabit.com/api/app-rewards/get-for-user?user_id=' + userID).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: GET_REWARDS_FOR_USER, payload: response.data });

				// Directional data
				dispatch({ type: REWARD_FLAG, payload: 'get_rewards_for_user_success' });
				dispatch({ type: REWARD_SUCCESS, payload: true });
				dispatch({ type: REWARD_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_GET_REWARDS_FOR_USER_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: REWARD_FLAG, payload: 'get_rewards_for_user_failure' });
				dispatch({ type: REWARD_ERROR, payload: response.data['error'] });
				dispatch({ type: REWARD_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_GET_REWARDS_FOR_USER_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: REWARD_FLAG, payload: 'get_rewards_for_user_failure' });
			dispatch({ type: REWARD_ERROR, payload: error });
			dispatch({ type: REWARD_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_GET_REWARDS_FOR_USER_FAILED');
		});
	};
};

export const rewardError = (error) => {
	return {
		type: REWARD_ERROR,
		payload: error
	};
};

export const rewardSuccess = (toggle) => {
	return {
		type: REWARD_SUCCESS,
		payload: toggle
	};
};

export const rewardLoading = (toggle) => {
	return {
		type: REWARD_LOADING,
		payload: toggle
	}
};

export const rewardFlag = (flag) => {
	return {
		type: REWARD_FLAG,
		payload: flag
	};
};