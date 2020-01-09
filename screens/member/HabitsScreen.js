import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import analytics from '@react-native-firebase/analytics';

import { habitSuccess, habitError, habitLoading, habitFlag, readHabit, getHabitsForUser } from '../../store/actions/HabitActions';
import { levelLoading, levelSuccess, getLevelsForHabit } from '../../store/actions/HabitLevelActions';
import { logLoading, logSuccess, logError, getLogsForUser } from '../../store/actions/HabitLogActions';

import Card from '../../components/base/Card';
import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import HabitBox from '../../components/base/HabitBox';
import PrimaryButton from '../../components/base/PrimaryButton';

import MainStyleSheet from '../../styles/MainStyleSheet';
import Colors from '../../constants/Colors'

const HabitsScreen = props => {
	/* -------------------------- *\
	|  Screen                      |
	|------------------------------|
	|  1. Dispatch                 |
	|  2. State variables          |
	|  3. Selectors                |
	|  4. Effects                  |
	|  5. Functions                |
	|  6. Render                   |
	\* -------------------------- */

	/* -------------------- *\
	|  1. Dispatch           |
	\* -------------------- */

	const dispatch = useDispatch();

	/* -------------------- *\
	|  2. State variables    |
	\* -------------------- */

	const [noHabits, setNoHabits] = useState(false);
	const [requestSent, setRequestSent] = useState(false);
	const [busy, setBusy] = useState(false);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const currentUserID = useSelector(state => state.user.current_user_id);

	const success = useSelector(state => state.levels.success);
	const levelsLoading = useSelector(state => state.levels.loading);

	const logsSuccess = useSelector(state => state.logs.success);
	const logsError = useSelector(state => state.logs.error);
	const logsLoading = useSelector(state => state.logs.loading);

	const habitArray = useSelector(state => state.habits.habits);
	const habitIDs = useSelector(state => state.habits.habit_ids);
	const habitError = useSelector(state => state.habits.error);
	const habitLoading = useSelector(state => state.habits.loading);
	const habit_success = useSelector(state => state.habits.success);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	// Fired once current user ID is pulled in from state
	useEffect(() => {
		if (currentUserID > 0 && currentUserID != null) {
			setRequestSent(true);
			dispatch(getHabitsForUser(currentUserID));
			dispatch(getLogsForUser(currentUserID));
		}
	}, [currentUserID]);

	// Fired once habits array is populated
	useEffect(() => {
		if (Object.keys(habitArray).length > 0 && requestSent == true) {
			setNoHabits(false);
		} else if (Object.keys(habitArray).length == 0 && requestSent == false) {
			setBusy(true);
			setNoHabits(false);
		} else {
			setNoHabits(true);
		}
	}, [habitArray]);

	// Fired when error while loading habits
	useEffect(() => {
		if (habitError != "" && habitError != null) {
			Alert.alert('Error', habitError, [{text: 'OK', onPress: () => { dispatch({type:'habit_error', payload:''}) }}]);
		}
	}, [habitError]);

	// Fired once levels have been successfully loaded
	useEffect(() => {
		if (success == true) {
			dispatch(levelSuccess(false));
			dispatch(logSuccess(false));
			props.navigation.navigate('HabitDetails');
		}
	}, [success]);

	// Fired once logs have been successfully loaded
	useEffect(() => {
		
	}, [logsSuccess]);

	// Fired when levels are loading
	useEffect(() => {
		if (levelsLoading == true) {
			setBusy(true);
		} else {
			setBusy(false);
		}
	}, [levelsLoading]);

	// Fired when logs are loading
	useEffect(() => {
		if (logsLoading == true) {
			setBusy(true);
		} else {
			setBusy(false);
		}
	}, [logsLoading]);

	// Fired once habits are done loading
	useEffect(() => {
		if (habit_success == true) {
			dispatch(habitSuccess(false));
		}
	}, [habit_success]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const showHabitDetailsScreen = (habit) => {
		const habitID = habit.id;

		// Update Redux value for usage in habit details screen
		dispatch(readHabit(habitID));
		dispatch(levelLoading(true));
		dispatch(getLevelsForHabit(habitID));
	};

	const renderMachine = (key) => {
		switch (key) {
			case "render_habits":
				return habitIDs.map((id) => {
					return (
						<HabitBox cardPress={showHabitDetailsScreen} id={id} key={id} title={habitArray[id].title} description={habitArray[id].description} level={habitArray[id].current_level} priority={habitArray[id].priority} points={habitArray[id].points} />  
					);
				});
			case "render_empty":
				return (
					<Card>
						<View style={{...MainStyleSheet.row, marginBottom: 8}}>
							<View style={MainStyleSheet.colOne}>
								<Text style={MainStyleSheet.headingTwo}>No Habits</Text>
								<Text style={MainStyleSheet.text}>No habits were found in your profile. Click below to get started.</Text>
							</View>
						</View>

						<View style={MainStyleSheet.row}>
							<View style={MainStyleSheet.colOneHalf}>
								<PrimaryButton title="Create Habit" onPress={() => { props.navigation.navigate('AddHabit'); }} />
							</View>
						</View>
					</Card>
				);
			default: return null;
		}
	};

	const isBusy = () => {
		return (
			<ActivityIndicator size="large" color={Colors.accent} />
		);
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<View style={styles.screen}>
			{busy == true ? isBusy() : 
				<ScrollView style={styles.scrollView}>
					{noHabits == true ? renderMachine("render_empty") : renderMachine("render_habits")}
				</ScrollView>
			}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		height: '100%',
		justifyContent: 'center'
	},
	scrollView: {
		width: '100%',
		padding: 24,
		flex: 1
	}
});

HabitsScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Your Habits',
		headerStyle: {
            backgroundColor: Colors.backgroundDark,
            borderBottomColor: 'black',
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerRight: (
        	<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        		<Item
        			title="Add Habit"
        			iconName = { Platform.OS === 'android' ? 'md-add' : 'ios-add' }
        			onPress = {() => { navData.navigation.navigate('AddHabit') }}
        		/>
        	</HeaderButtons>
        )
	};
};

export default HabitsScreen;