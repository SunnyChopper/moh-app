import { combineReducers } from 'redux';

import HabitLevelReducer from './HabitLevelReducer';
import HabitLogReducer from './HabitLogReducer';
import HabitReducer from './HabitReducer';
import RewardReducer from './RewardReducer';
import UserReducer from './UserReducer';

const RootReducer = combineReducers({
	levels: HabitLevelReducer,
	logs: HabitLogReducer,
	habits: HabitReducer,
	rewards: RewardReducer,
	user: UserReducer
});

export default RootReducer;