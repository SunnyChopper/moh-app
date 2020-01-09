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
				dispatch({ type: USER_FLAG, payload: 'create_user_success' });
				dispatch({ type: CREATE_USER, payload: response.data['user'] });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });
			} else {
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });
		});
	};
};

export const loginUser = (email, password) => {
	return (dispatch) => {
		console.log('[LOG] - Function `loginUser` called from `UserActions`');
		const postVariables = {
			email: email,
			password: password
		};

		console.log('[LOG] - Function `loginUser` has variable `postVariables`:');
		console.log('[DATA DUMP]');
		console.log(postVariables);

		axios.post('https://mindofhabit.com/api/app-users/login', {postVariables}).then(function(response) {
			console.log('[LOG] - Function `loginUser` has responded from API');
			console.log(response.data);
			if (response.data['success'] == true) {
				dispatch({ type: USER_FLAG, payload: 'login_user_success' });
				dispatch({ type: LOGIN_USER, payload: response.data['user'] });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });
			} else {
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });
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

export const getUser = (userID) => {
	return (dispatch) => {
		console.log('[LOG] - Function `getUser` called upon in `UserActions`');
		console.log('[LOG] - Function `getUser` got parameter userID=' + userID);
		axios.get('https://mindofhabit.com/api/app-users/read?user_id=' + userID).then(function(response) {
			console.log('[LOG] - Received response to GET request for user.');
			if (response.data['success'] == true) {
				console.log('Successfully got updated user...');
				console.log(response.data);
				dispatch({ type: USER_FLAG, payload: 'get_user_success' });
				dispatch({ type: GET_USER, payload: response.data['user'] });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });
			} else {
				dispatch({ type: USER_FLAG, payload: 'get_user_failure' });
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: USER_ERROR, payload: error });
		});
	};
}

export const getUserPoints = (userID) => {
	return (dispatch) => {
		console.log('Getting an updated points for user ' + userID);
		axios.get('https://mindofhabit.com/api/app-users/get-points?user_id=' + userID).then(function(response) {
			if (response.data['success'] == true) {
				console.log('Successfully got updated points...');
				console.log(response.data);
				dispatch({ type: USER_FLAG, payload: 'get_user_points_success' });
				dispatch({ type: GET_USER_POINTS, payload: response.data['points'] });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });
			} else {
				dispatch({ type: USER_FLAG, payload: 'get_user_points_failure' });
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: USER_ERROR, payload: error });
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