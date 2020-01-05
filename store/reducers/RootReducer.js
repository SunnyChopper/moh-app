import { combineReducer } from 'redux';

import HabitLevelReducer from './HabitLevelReducer';
import HabitLogReducer from './HabitLogReducer';
import HabitReducer from './HabitReducer';
import RewardReducer from './RewardReducer';
import UserReducer from './UserReducer';

const RootReducer = combineReducers({
	HabitLevelReducer,
	HabitLogReducer,
	HabitReducer,
	RewardReducer,
	UserReducer
});

export default RootReducer;