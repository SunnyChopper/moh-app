import {
	CREATE_REWARD,
	READ_REWARD,
	UPDATE_REWARD,
	DELETE_REWARD,
	GET_REWARDS_FOR_USER
} from '../actions/types';

const initialState = {
	current_reward_id: 0,
	rewards: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_REWARD:
			return {
				...state,
				rewards: rewards.push(action.payload)
			};
		case READ_REWARD:
			return {
				...state,
				current_reward_id: action.payload
			};
		case UPDATE_REWARD:
			const newRewards = state.rewards;
			for (var i = 0; i < newRewards.length; i++) {
				if (newRewards[i].id == action.payload.id) {
					newRewards[i] = action.payload;
				}
			}

			return {
				...state,
				rewards: newRewards
			};
		case DELETE_REWARD:
			newRewards = state.rewards;
			for (var i = 0; i < newRewards.length; i++) {
				if (newRewards[i].id == action.payload.id) {
					newRewards.splice(i, 1);
				}
			}

			return {
				...state,
				rewards: newRewards
			};
		case GET_REWARDS_FOR_USER:
			return {
				...state,
				rewards: action.payload
			};
		default: return state;
	}
};