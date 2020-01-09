import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { readHabit } from '../../store/actions/HabitActions';
import { levelError, levelLoading, getLevelsForHabit } from '../../store/actions/HabitLevelActions';
import { logError, logSuccess, logLoading, createLog, getLogsForHabit } from '../../store/actions/HabitLogActions';
import { getUserPoints } from '../../store/actions/UserActions';

import LevelCard from '../../components/base/LevelCard';
import PrimaryButton from '../../components/base/PrimaryButton';
import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import Card from '../../components/base/Card';

import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

import axios from 'axios';

const HabitDetailsScreen = props => {
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

	const [noLevels, setNoLevels] = useState(false);
	const [alreadyCompleted, setAlreadyCompleted] = useState(false);
	const [level, setLevel] = useState(0);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const currentUserID = useSelector(state => state.user.current_user_id);

	const levelError = useSelector(state => state.levels.error);
	const levels = useSelector(state => state.levels.levels);
	const levelIDs = useSelector(state => state.levels.level_ids);

	const logsError = useSelector(state => state.logs.error);
	const log_success = useSelector(state => state.logs.success);
	const logs = useSelector(state => state.logs.logs);
	const logIDs = useSelector(state => state.logs.logs_ids);

	const habitID = useSelector(state => state.habits.current_habit_id);
	const habits = useSelector(state => state.habits.habits);
	const habit = useSelector(state => state.habits.habits[habitID]);
	const habit_loading = useSelector(state => state.habits.loading);
	const habit_error = useSelector(state => state.habits.error);
	const habit_success = useSelector(state => state.habits.success);
	const habit_flag = useSelector(state => state.habits.flag);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	// Fired when error while marking as complete.
	useEffect(() => {
		if (levelError != "" && levelError != null) {
			Alert.alert('Error', levelError, [{text:'OK', onPress: () => { dispatch() }}])
		}
	}, [levelError]);

	useEffect(() => {
		if (Object.keys(levels).length > 0) {
			if (levels[habit.current_level] != undefined) {
				setLevel(levels[habit.current_level].order);
				setNoLevels(false);
			}
		} else {
			setNoLevels(true);
		}
	}, [levels]);

	// Fired once marked as complete.
	useEffect(() => {
		if (log_success == true) {
			dispatch(logSuccess(false));
			Alert.alert('Success', 'You\'ve successfully completed a habit. You earned ' + habit.points + ' points.');
			dispatch(getUserPoints(currentUserID));
			props.navigation.navigate('Habits');
		}
	}, [log_success]);

	useEffect(() => {
		if (Object.keys(logs).length > 0) {
			const keys = Object.keys(logs);
			keys.map((key) => {
				if (logs[key].habit_id == habitID) {
					const date = new Date(logs[key].created_at.replace(/-/g,"/"));

					if (isToday(date) == true) {
						console.log('[LOG] - Setting `alreadyComplete` to true.');
						setAlreadyCompleted(true);
					}
				}
			});

			if (alreadyCompleted == true) {
				console.log('[LOG] - Logs were imported, however, already found done for today.');
			}
		} else {
			console.log('No logs imported.');
		}
	}, [logs]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const isToday = (date) => {
		const today = new Date();
		const today_month = today.getMonth();
		const today_day = today.getDate();

		if (today_month == date.getMonth() && today_day == date.getDate()) {
			return true;
		} else {
			return false;
		}
	}

	const fontColor = (priority) => {
		switch (priority) {
			case "High": return "red";
			case "Medium": return "orange";
			case "Low": return "green";
			default: return Colors.primary;
		}
	};

	const markCompleteHandler = () => {
		console.log('[LOG] - markCompleteHandler function called upon.');
		const log = {
			user_id: currentUserID,
			habit_id: habitID,
			level_id: habit.current_level
		};
		console.log('[LOG] - markCompleteHandler variable `log`:');
		console.log('[DATA DUMP]');
		console.log(log);

		console.log('[LOG] - markCompleteHandler function calling `dispatch(createLog(log));`');
		dispatch(createLog(log));
	};

	const renderButton = () => {
		if (alreadyCompleted == true) {
			return (
				<PrimaryButton style={{backgroundColor: Colors.backgroundLight}} textstyle={{color: '#8a8a8a'}} title="Already Complete for Today" />
			);
		} else {
			return (
				<PrimaryButton style={{backgroundColor: Colors.accent}} onPress={markCompleteHandler} title="Mark Complete for Today" />
			);
		}
	};

	const renderMachine = (key) => {
		switch (key) {
			case "render_empty":
				return (
					<Card>
						<Text style={{...MainStyleSheet.headingOne, marginBottom: 4}}>No Levels</Text>
						<Text style={{...MainStyleSheet.text, marginBottom: 8, fontSize: 14, lineHeight: 28}}>Levels are various difficulty levels to stay on track for building your habit. This particular habit does not have any levels, click below to get started.</Text>
						<View style={{...MainStyleSheet.row, justifyContent: 'flex-end'}}>
							<View style={MainStyleSheet.colOneHalf}>
								<PrimaryButton onPress={() => { props.navigation.navigate('AddHabitLevel') }} title="Add Level" />
							</View>
						</View>
					</Card>
				);
			case "render_levels":
				return levelIDs.map((id) => {
					return (
						<LevelCard onPress={(id) => { console.log(id); }} id={id} key={id} cardStyle={{ marginVertical: 12 }} title={levels[id].title} description={levels[id].description} level={levels[id].order} />
					);
				});
			case "render_level_button":
				return (
					<View style={{...MainStyleSheet.row, marginTop: 8, marginBottom: 32}}>
						<View style={MainStyleSheet.colOne}>
							<PrimaryButton textstyle={{color: 'black', fontSize: 18, fontFamily: 'montserrat-light'}} style={{height: 100, backgroundColor: Colors.backgroundLight, borderRadius: 8}} onPress={() => { props.navigation.navigate('AddHabitLevel') }} title="Add Level" />
						</View>
					</View>
				);
			case "render_footer":
				return (
					<View style={styles.bottomFooter}>
						<Text style={{...MainStyleSheet.boldtext, fontSize: 20, lineHeight: 24, marginBottom: 16, textAlign: 'center'}}>Points for Completing: {renderPoints()}</Text>
						{renderButton()}
					</View>
				);
		}
	};

	const renderTitle = () => {
		if (habitID in habits) {
			return habits[habitID].title;
		} else {
			return "";
		}
	};

	const renderDescription = () => {
		if (habitID in habits) {
			return habits[habitID].description;
		} else {
			return "";
		}
	};

	const renderPoints = () => {
		if (habitID in habits) {
			return habits[habitID].points;
		} else {
			return "";
		}
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<View style={styles.screen}>
			<ScrollView style={{...MainStyleSheet.scrollView, flex: 1, padding: 24, height: '100%'}}>
				<View style={MainStyleSheet.container}>
					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Text style={{...MainStyleSheet.headingOne, marginBottom: 8}}>{renderTitle()}</Text>
							<Text style={{...MainStyleSheet.text, fontSize: 16, lineHeight: 24, marginBottom: 16}}>{renderDescription()}</Text>
							<Text style={{...MainStyleSheet.headingTwo, marginBottom: 4}}>Levels</Text>
							<Text style={{...MainStyleSheet.text, fontSize: 16, lineHeight: 24, marginBottom: 8}}>Your habits are broken down into "levels" which you have to conquer to keep building mastery of your habit.</Text>
							<Text style={{...MainStyleSheet.text, fontSize: 18, color: Colors.accent}}>Current Level: {level}</Text>
						</View>
					</View>

					<View style={{...MainStyleSheet.row, marginTop: 8}}>
						<View style={MainStyleSheet.colOne}>
							{noLevels == true ? renderMachine("render_empty") : renderMachine("render_levels")}
							{noLevels == true ? console.log('') : renderMachine("render_level_button")}
						</View>
					</View>
				</View>
			</ScrollView>
			{noLevels == true ? console.log('No levels for completion.') : renderMachine("render_footer")}
		</View>
	);
};

HabitDetailsScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Habit Details',
		headerStyle: {
            backgroundColor: Colors.backgroundDark,
            borderBottomColor: 'black',
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerTintColor: Colors.accent,
        headerLeft: (
        	<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        		<Item
        			title="Back"
        			iconName = { Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back' }
        			onPress = {() => {
        				navData.navigation.navigate('Habits');
        			}}
        		/>
        	</HeaderButtons>
        ),
        headerRight: (
        	<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        		<Item
        			title="Edit Habit"
        			iconName = { Platform.OS === 'android' ? 'md-settings' : 'ios-settings' }
        			onPress = {() => {
        				navData.navigation.navigate('EditHabit');
        			}}
        		/>
        	</HeaderButtons>
        )
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		height: '100%'
	},
	title: {
		color: Colors.accent,
		fontFamily: 'montserrat',
		fontSize: 24
	},
	bottomFooter: {
		padding: 24,
		backgroundColor: Colors.backgroundLight,
		justifyContent: 'flex-end'
	}
});

export default HabitDetailsScreen;