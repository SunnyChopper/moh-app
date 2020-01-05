import {
	CREATE_LEVEL,
	READ_LEVEL,
	UPDATE_LEVEL,
	DELETE_LEVEL,
	GET_LEVELS_FOR_USER
} from '../actions/types';

const initialState = {
	current_level_id: 0,
	levels: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_LEVEL:
			return {
				...state,
				levels: levels.push(action.payload)
			};
		case READ_LEVEL:
			return {
				...state,
				current_level_id: action.payload
			};
		case UPDATE_LEVEL:
			const newLevels = state.levels;
			for (var i = 0; i < newLevels.length; i++) {
				if (newLevels[i].id == action.payload.id) {
					newLevels[i] = action.payload;
				}
			}

			return {
				...state,
				levels: newLevels
			};
		case DELETE_LEVEL:
			newLevels = state.levels;
			for (var i = 0; i < newLevels.length; i++) {
				if (newLevels[i].id == action.payload.id) {
					newLevels.splice(i, 1);
				}
			}

			return {
				...state,
				levels: newLevels
			};
		case GET_LEVELS_FOR_USER:
			return {
				...state,
				levels: action.payload
			};
		default: return state;
	}
};