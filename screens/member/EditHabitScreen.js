import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Picker, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { habitLoading, habitFlag, habitSuccess, habitError, updateHabit, deleteHabit, getHabitsForUser } from '../../store/actions/HabitActions';

import Input from '../../components/base/Input';
import TextArea from '../../components/base/TextArea';
import PrimaryButton from '../../components/base/PrimaryButton';

import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const EditHabitScreen = props => {
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

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [why, setWhy] = useState('');
	const [points, setPoints] = useState(0);
	const [currentLevel, setCurrentLevel] = useState(0);
	const [prevState, setPrevState] = useState('');

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const user_id = useSelector(state => state.user.current_user_id);

	const habitID = useSelector(state => state.habits.current_habit_id);
	const habits = useSelector(state => state.habits.habits);
	const habit = useSelector(state => state.habits.habits[habitID]);
	const levels = useSelector(state => state.levels.levels);

	const loading = useSelector(state => state.habits.loading);
	const flag = useSelector(state => state.habits.flag);
	const error = useSelector(state => state.habits.error);
	const success = useSelector(state => state.habits.success);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		if (habitID in habits) {
			setTitle(habit.title);
			setDescription(habit.description);
			setWhy(habit.why);
			setPoints(habit.points);
			setCurrentLevel(habit.current_level);
		}
	}, [habit]);

	useEffect(() => {
		if (error != "" && error != null) {
			Alert.alert('Error', error, [{text: 'OK', onPress: () => { dispatch(habitError('')) }}]);
		}
	}, [error]);

	useEffect(() => {
		console.log('[LOG] - useEffect for `success` in `EditHabitScreen`');
		console.log('[DATA DUMP] - `success` = ' + success);
		console.log('[DATA DUMP] - `flag` = ' + flag);

		if (success == true && flag == 'update_habit_success') {
			setPrevState('update_habit_success');
			dispatch(habitSuccess(false));
			dispatch(habitLoading(true));
			dispatch(getHabitsForUser(user_id));
		} else if (success == true && flag == 'delete_habit_success') {
			setPrevState('delete_habit_success');
			dispatch(habitSuccess(false));
			dispatch(habitLoading(true));
			dispatch(getHabitsForUser(user_id));
		} else if (success == true && flag == 'get_habits_for_user_success') {
			dispatch(habitSuccess(false));

			if (prevState === 'update_habit_success') {
				console.log('[LOG] - Navigating back to `HabitDetailsScreen` from `EditHabitScreen`');
				props.navigation.navigate('HabitDetails');
			} else {
				console.log('[LOG] - Navigating back to `HabitsScreen` from `EditHabitScreen`');
				props.navigation.navigate('Habits');
			}
		}
	}, [success]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const titleTextHandler = (title) => {
		setTitle(title);
	};

	const descriptionTextHandler = (description) => {
		setDescription(description);
	};

	const whyTextHandler = (why) => {
		setWhy(why);
	};

	const pointsTextHandler = (points) => {
		setPoints(points);
	};

	const currentLevelHandler = (value, index) => {
		console.log('Picker with value: ' + value);
		setCurrentLevel(value);
	};

	const renderItems = () => {
		const keys = Object.keys(levels);
		return keys.map((key) => {
			return (
				<Picker.Item key={levels[key].id} value={levels[key].id} label={levels[key].title} />
			);
		});
	};

	const submitHandler = () => {
		if ((title != "" || title != null) && (why != "" || why != null) && (points != "" || points != null) && (currentLevel != "" || currentLevel != null)) {
			const payload = {
				id: habitID,
				title: title,
				description: description,
				why: why,
				points: points,
				current_level: currentLevel
			};

			dispatch(updateHabit(payload));
		} else {
			Alert.alert('Error', 'Please fill in all required fields.');
		}
	};

	const deleteHandler = () => {
		Alert.alert('Confirm', 'Are you sure you want to delete this habit?', [
			{
				text: 'OK',
				onPress: () => {
					dispatch(habitLoading(true));
					dispatch(deleteHabit(habitID));
				}
			},
			{
				text: 'Cancel',
				onPress: () => null
			}
		]);
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={MainStyleSheet.screen}>
			<ScrollView style={{...MainStyleSheet.container, padding: 24}}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={MainStyleSheet.headingOne}>Edit Habit</Text>
					</View>
				</View>

				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Input label="Title" value={title} changeText={titleTextHandler} />
					</View>
				</View>

				<View style={{...MainStyleSheet.row, marginTop: 8}}>
					<View style={MainStyleSheet.colOne}>
						<TextArea label="Description" numLines={4} height={75} text={description} changeText={descriptionTextHandler} />
					</View>
				</View>

				<View style={{...MainStyleSheet.row, marginTop: 8}}>
					<View style={MainStyleSheet.colOne}>
						<TextArea label="Your Why" numLines={4} height={75} text={why} changeText={whyTextHandler} />
					</View>
				</View>

				<View style={{...MainStyleSheet.row, marginTop: 8}}>
					<View style={MainStyleSheet.colOne}>
						<Input label="Points for Completion" keyboardType="number-pad" value={points.toString()} changeText={pointsTextHandler} />
					</View>
				</View>

				<View style={{...MainStyleSheet.row, marginTop: 8}}>
					<View style={MainStyleSheet.colOne}>
						<Text style={MainStyleSheet.text}>Current Level:</Text>
						<Picker selectedValue={currentLevel} onValueChange={currentLevelHandler} style={{width: '100%'}}>
							{renderItems()}
						</Picker>
					</View>
				</View>

				<View style={{...MainStyleSheet.row, marginTop: 8, marginBottom: 64}}>
					<View style={MainStyleSheet.colOne}>
						<PrimaryButton style={{ backgroundColor: Colors.danger, marginBottom: 16 }} textstyle={{ color: 'white' }} onPress={deleteHandler} title="Delete Habit" />
						<PrimaryButton style={{ backgroundColor: Colors.accent }} textstyle={{ color: 'white' }} onPress={submitHandler} title="Update Habit" />
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);	
};

EditHabitScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Edit Habit',
		headerStyle: {
            backgroundColor: Colors.backgroundDark,
            borderBottomColor: 'black',
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerTintColor: Colors.accent
	};
};

const styles = StyleSheet.create({
	
});

export default EditHabitScreen;