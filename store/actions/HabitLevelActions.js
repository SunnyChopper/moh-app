import {
	CREATE_LEVEL,
	UPDATE_LEVEL,
	DELETE_LEVEL,
	GET_LEVELS_FOR_USER
} from './types';

import axios from 'axios';

export default createLevel = (level) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-habit-levels/create', {level}).then();
		dispatch({ type: CREATE_LEVEL, payload: level });
	}
};