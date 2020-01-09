import {
	CREATE_REWARD,
	READ_REWARD,
	UPDATE_REWARD,
	DELETE_REWARD,
	GET_REWARDS_FOR_USER,
	REWARD_ERROR,
	REWARD_SUCCESS,
	REWARD_LOADING,
	REWARD_FLAG
} from '../actions/types';

const initialState = {
	current_reward_id: 0,
	reward_ids: [],
	rewards: {},
	error: '',
	success: false,
	loading: false,
	flag: ''
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_REWARD:
			const createRewards = state.rewards;
			createRewards[action.payload['id']] = action.payload;

			return {
				...state,
				rewards: createRewards
			};
		case READ_REWARD:
			return {
				...state,
				current_reward_id: action.payload
			};
		case UPDATE_REWARD:
			const updateRewards = state.rewards;
			for (var i = 0; i < updateRewards.length; i++) {
				if (updateRewards[i].id == action.payload.id) {
					updateRewards[i] = action.payload;
				}
			}

			return {
				...state,
				rewards: updateRewards
			};
		case DELETE_REWARD:
			const deleteRewards = state.rewards;
			delete deleteRewards[action.payload];
			console.log('[LOG] - New rewards have been created.');
			console.log('[DATA DUMP] - `deleteRewards` = ');
			console.log(deleteRewards);

			return {
				...state,
				rewards: deleteRewards
			};
		case GET_REWARDS_FOR_USER:
			return {
				...state,
				reward_ids: action.payload['reward_ids'],
				rewards: action.payload['rewards']
			};
		case REWARD_ERROR:
			return {
				...state,
				error: action.payload
			};
		case REWARD_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case REWARD_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case REWARD_FLAG:
			return {
				...state,
				flag: action.payload
			}
		default: return state;
	}
};