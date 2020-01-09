import {
	CREATE_HABIT,
	READ_HABIT,
	UPDATE_HABIT,
	DELETE_HABIT,
	GET_HABITS_FOR_USER,
	HABIT_ERROR,
	HABIT_SUCCESS,
	HABIT_LOADING,
	HABIT_FLAG
} from '../actions/types';

const initialState = {
	current_habit_id: 0,
	habit_ids: [],
	habits: {},
	error: '',
	success: false,
	loading: false,
	flag: ''
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_HABIT:
			const createHabits = state.habits;
			createHabits[action.payload['id']] = action.payload;

			return {
				...state,
				habits: createHabits
			};
		case READ_HABIT:
			return {
				...state,
				current_habit_id: action.payload
			};
		case UPDATE_HABIT:
			const updateHabits = state.habits;
			const keys = Object.keys(updateHabits);
			keys.forEach(function(key) {
				if (key == action.payload['id']) {
					updateHabits[key] = action.payload;
				}
			});

			return {
				...state,
				habits: updateHabits
			};
		case DELETE_HABIT:
			const deleteHabits = state.habits;
			for (var i = 0; i < deleteHabits.length; i++) {
				if (deleteHabits[i].id == action.payload.id) {
					deleteHabits.splice(i, 1);
				}
			}

			return {
				...state,
				habits: deleteHabits
			};
		case GET_HABITS_FOR_USER:
			return {
				...state,
				habit_ids: action.payload['habit_ids'],
				habits: action.payload['habits']
			};
		case HABIT_ERROR:
			return {
				...state,
				error: action.payload
			}
		case HABIT_SUCCESS:
			return {
				...state,
				success: action.payload
			}
		case HABIT_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case HABIT_FLAG:
			return {
				...state,
				flag: action.payload
			};
		default: return state;
	}	
};