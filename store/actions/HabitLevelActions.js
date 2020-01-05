import {
	CREATE_LEVEL,
	READ_LEVEL,
	UPDATE_LEVEL,
	DELETE_LEVEL,
	GET_LEVELS_FOR_USER
} from './types';

import axios from 'axios';

export default createLevel = (level) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-habit-levels/create', {level}).then(function(response) {
			dispatch({ type: CREATE_LEVEL, payload: level });
		});
	};
};

export default readLevel = (levelID) => {
	return {
		type: READ_LEVEL,
		payload: levelID
	};
};

export default updateLevel = (level) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-habit-levels/update', {level}).then(function(response) {
			dispatch({ type: UPDATE_LEVEL, payload: level });
		});
	};
};

export default deleteLevel = (levelID) => {
	return (dispatch) => {
		axios.post('https://mindofhabit.com/api/app-habit-levels/delete', { level_id: levelID }).then(function(response) {
			dispatch({ type: DELETE_LEVEL, payload: levelID });
		});
	};
};

export default getLevelsForUser = (userID) => {
	return (dispatch) => {
		axios.get('https://mindofhabit.com/api/app-habit-levels/get-for-user?userID=' + userID).then(function(response) {
			dispatch({ type: GET_LEVELS_FOR_USER, payload: response });
		});
	};
};