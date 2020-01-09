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
} from '../actions/types';

const initialState = {
	current_level_id: 0,
	level_ids: [],
	levels: {},
	error: '',
	success: false,
	loading: false,
	flag: ''
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_LEVEL:
			const newLevels = state.levels;
			newLevels[action.payload['id']] = action.payload;

			return {
				...state,
				levels: newLevels
			};
		case READ_LEVEL:
			return {
				...state,
				current_level_id: action.payload
			};
		case UPDATE_LEVEL:
			newLevels = state.levels;
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
		case GET_LEVELS_FOR_HABIT:
			return {
				...state,
				loading: false,
				level_ids: action.payload['level_ids'],
				levels: action.payload['levels']
			}
		case LEVEL_ERROR:
			return {
				...state,
				error: action.payload
			};
		case LEVEL_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case LEVEL_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case LEVEL_FLAG:
			return {
				...state,
				flag: action.payload
			};
		default: return state;
	}
};