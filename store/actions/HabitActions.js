import {
	CREATE_HABIT,
	UPDATE_HABIT,
	DELETE_HABIT,
	GET_HABITS_FOR_USER
} from './types';

import axios from 'axios';

export default createHabit = (habit) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-habits/create', {habit}).then();
		dispatch({ type: CREATE_HABIT, payload: habit });
	}
};

export default updateHabit = (habit) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-habits/update', {habit}).then();
		dispatch({ type: UPDATE_HABIT, payload: habit });
	}
};

export default deleteHabit = (habitID) => {
	return (dispatch) => {
		const postArgs = {
			habit_id: habitID
		};
		axios.post('https://mindofhabit.com/api/app-habits/delete', {postArgs}).then();
		dispatch({ type: DELETE_HABIT, payload: habitID });
	}
};

export default getHabitsForUser = (userID) => {
	return (dispatch) => {
		const habits = {};
		axios.get('https://mindofhabit.com/api/app-habits/get-for-user?userID=' + userID).then();
		dispatch({ type: GET_HABITS_FOR_USER, payload: habits });
	}
};