import {
	CREATE_USER,
	LOGIN_USER,
	LOGOUT_USER,
	CLEAR_ERROR,
	UPDATE_USER,
	DELETE_USER,
	OVERWRITE_USER,
	REDEEM_REWARD,
	GET_USER,
	GET_USER_POINTS,
	USER_ERROR,
	USER_SUCCESS,
	USER_LOADING,
	USER_FLAG
} from './types';

import axios from 'axios';
import { trackEvent } from '../../analytics/analytics';

export const createUser = (user) => {
	const postVariables = {
		first_name: user["first_name"],
		last_name: user["last_name"],
		email: user["email"],
		password: user["password"]
	};

	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-users/create', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: CREATE_USER, payload: response.data['user'] });

				// Directional data
				dispatch({ type: USER_FLAG, payload: 'create_user_success' });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_CREATE_USER_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: USER_FLAG, payload: 'create_user_failure' });
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_CREATE_USER_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: USER_FLAG, payload: 'create_user_failure' });
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_CREATE_USER_FAILED');
		});
	};
};

export const loginUser = (email, password) => {
	return (dispatch) => {
		const postVariables = {
			email: email,
			password: password
		};

		axios.post('https://mindofhabit.com/api/app-users/login', {postVariables}).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: LOGIN_USER, payload: response.data['user'] });

				// Directional data
				dispatch({ type: USER_FLAG, payload: 'login_user_success' });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_LOGIN_USER_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: USER_FLAG, payload: 'login_user_failure' });
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_LOGIN_USER_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: USER_FLAG, payload: 'login_user_failure' });
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_LOGIN_USER_FAILED');
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
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: UPDATE_USER, payload: response.data['user'] });

				// Directional data
				dispatch({ type: USER_FLAG, payload: 'update_user_success' });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_UPDATE_USER_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: USER_FLAG, payload: 'update_user_failure' });
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_UPDATE_USER_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: USER_FLAG, payload: 'update_user_failure' });
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_UPDATE_USER_FAILED');
		});
	};
};

export const deleteUser = (userID) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-users/delete', {user_id: userID}).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: DELETE_USER, payload: userID });

				// Directional data
				dispatch({ type: USER_FLAG, payload: 'delete_user_success' });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_DELETE_USER_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: USER_FLAG, payload: 'delete_user_failure' });
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_DELETE_USER_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: USER_FLAG, payload: 'delete_user_failure' });
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_DELETE_USER_FAILED');
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
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: GET_REWARDS_FOR_USER, payload: response });

				// Directional data
				dispatch({ type: USER_FLAG, payload: 'get_rewards_for_user_success' });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_GET_REWARDS_FOR_USER_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: USER_FLAG, payload: 'get_rewards_for_user_failure' });
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_GET_REWARDS_FOR_USER_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: USER_FLAG, payload: 'delete_user_failure' });
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_GET_REWARDS_FOR_USER_FAILED');
		});
	};
};

export const getUser = (userID) => {
	return (dispatch) => {
		axios.get('https://mindofhabit.com/api/app-users/read?user_id=' + userID).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: GET_USER, payload: response.data['user'] });

				// Directional data
				dispatch({ type: USER_FLAG, payload: 'get_user_success' });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_GET_USER_SUCCESS');
			} else {
				// Directional data
				dispatch({ type: USER_FLAG, payload: 'get_user_failure' });
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_GET_USER_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: USER_FLAG, payload: 'get_user_failure' });
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_GET_USER_FAILED');
		});
	};
}

export const getUserPoints = (userID) => {
	return (dispatch) => {
		axios.get('https://mindofhabit.com/api/app-users/get-points?user_id=' + userID).then(function(response) {
			if (response.data['success'] == true) {
				// Payload
				dispatch({ type: GET_USER_POINTS, payload: response.data['points'] });

				// Directional data
				dispatch({ type: USER_FLAG, payload: 'get_user_points_success' });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_GET_USER_POINTS_SUCCESS');
			} else {
				dispatch({ type: USER_FLAG, payload: 'get_user_points_failure' });
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });

				// Analytics
				trackEvent('EVENT_GET_USER_POINTS_FAILED');
			}
		}).catch(function(error) {
			// Directional data
			dispatch({ type: USER_FLAG, payload: 'get_user_points_failure' });
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });

			// Analytics
			trackEvent('EVENT_GET_USER_POINTS_FAILED');
		});
	};
};

export const userError = (error) => {
	return {
		type: USER_ERROR,
		payload: error
	};
};

export const userSuccess = (toggle) => {
	return {
		type: USER_SUCCESS,
		payload: toggle
	};
};

export const userLoading = (toggle) => {
	return {
		type: USER_LOADING,
		payload: toggle
	}
};

export const userFlag = (flag) => {
	return {
		type: USER_FLAG,
		payload: flag
	};
};