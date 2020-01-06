import {
	CREATE_HABIT,
	READ_HABIT,
	UPDATE_HABIT,
	DELETE_HABIT,
	GET_HABITS_FOR_USER
} from '../actions/types';

const initialState = {
	current_habit_id: 0,
	habit_ids: [],
	habits: []	
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_HABIT:
			return {
				...state,
				habits: habits.push(action.payload)
			};
		case READ_HABIT:
			return {
				...state,
				current_habit_id: action.payload
			};
		case UPDATE_HABIT:
			const newHabits = state.habits;
			newHabits.forEach(function(item) {
				if (item.id == action.payload.id) {
					item = action.payload;
				}
			});

			return {
				...state,
				habits: newHabits
			};
		case DELETE_HABIT:
			newHabits = state.habits;
			for (var i = 0; i < newHabits.length; i++) {
				if (newHabits[i].id == action.payload.id) {
					newHabits.splice(i, 1);
				}
			}

			return {
				...state,
				habits: newHabits
			};
		case GET_HABITS_FOR_USER:
			return {
				...state,
				habits: action.payload
			};
		default: return state;
	}	
};