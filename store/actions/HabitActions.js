import {
	CREATE_HABIT,
	READ_HABIT
	UPDATE_HABIT,
	DELETE_HABIT,
	GET_HABITS_FOR_USER
} from './types';

import axios from 'axios';

export default createHabit = (habit) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-habits/create', {habit}).then(function(response) {
			dispatch({ type: CREATE_HABIT, payload: habit });
		});
	};
};

export default readHabit = (habitID) => {
	return {
		type: READ_HABIT,
		payload: habitID
	};
};

export default updateHabit = (habit) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-habits/update', {habit}).then(function(response) {
			dispatch({ type: UPDATE_HABIT, payload: habit });
		});
	};
};

export default deleteHabit = (habitID) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-habits/delete', { habit_id: habitID }).then(function(response) {
			dispatch({ type: DELETE_HABIT, payload: habitID });
		});
	};
};

export default getHabitsForUser = (userID) => {
	return (dispatch) => {
		axios.get('https://mindofhabit.com/api/app-habits/get-for-user?userID=' + userID).then(function(response) {
			dispatch({ type: GET_HABITS_FOR_USER, payload: response });
		});
	};
};