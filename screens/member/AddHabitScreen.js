import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { habitError, habitSuccess, habitLoading, habitFlag, createHabit, addToggle } from '../../store/actions/HabitActions';

import Input from '../../components/base/Input';
import TextArea from '../../components/base/TextArea';
import PrimaryButton from '../../components/base/PrimaryButton';

import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const AddHabitScreen = props => {
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
	const [busy, setBusy] = useState(false);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const currentUserID = useSelector(state => state.user.current_user_id);
	const currentUser = useSelector(state => state.user.current_user);

	const habit_error = useSelector(state => state.habits.error);
	const habit_success = useSelector(state => state.habits.success);
	const habit_loading = useSelector(state => state.habits.loading);
	const habit_flag = useSelector(state => state.habits.flag);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		if (habit_error != "" && habit_error != null) {
			Alert.alert('Error', habit_error, [{ text: 'OK', onPress: () => { dispatch(habitError('')); } }]);
		}
	}, [habit_error]);

	useEffect(() => {
		if (habit_success == true && habit_flag == 'create_habit_success') {
			dispatch(habitSuccess(false));
			dispatch(getHabitsForUser(currentUserID));
		} else if (habit_success == true && habit_flag == 'get_habits_for_user') {
			dispatch(habitSuccess(false));
			props.navigation.navigate('Habits');
		}
	}, [habit_success]);

	useEffect(() => {
		if (habit_loading == true) {
			setBusy(true);
		} else {
			setBusy(false);
		}
	}, [habit_loading]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const titleTextChange = (title) => {
		setTitle(title);
	};

	const descriptionTextChange = (description) => {
		setDescription(description);
	};

	const whyTextChange = (why) => {
		setWhy(why);
	};

	const pointsTextChange = (points) => {
		setPoints(points);
	};

	const submitHabitHandler = () => {
		if (title != "" && description != "" && why != "" && points != "") {
			const postVariables = {
				user_id: currentUserID,
				points: points,
				title: title,
				description: description,
				why: why
			};
			console.log(postVariables);

			// Add the habit
			dispatch(createHabit(postVariables));

			// Go back to habits page
			props.navigation.navigate('Home');
		} else {
			Alert.alert('Error', 'Please fill out all fields.');
		}
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={styles.screen}>
			<ScrollView style={MainStyleSheet.container}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={MainStyleSheet.container}>
						<View style={MainStyleSheet.row}>
							<View style={MainStyleSheet.colOne}>
								<Input label="Habit" changeText={titleTextChange} />
							</View>
						</View>

						<View style={{...MainStyleSheet.row, marginTop: 16}}>
							<View style={MainStyleSheet.colOne}>
								<TextArea label="Description" changeText={descriptionTextChange} text={description} height={125} />
							</View>
						</View>

						<View style={{...MainStyleSheet.row, marginTop: 16}}>
							<View style={MainStyleSheet.colOne}>
								<TextArea label="Your Why" changeText={whyTextChange} text={why} height={125} />
							</View>
						</View>

						<View style={{...MainStyleSheet.row, marginTop: 16}}>
							<View style={MainStyleSheet.colOne}>
								<Input label="Points for Completion" keyboardType="number-pad" changeText={pointsTextChange} />
							</View>
						</View>

						<View style={{...MainStyleSheet.row, marginTop: 16}}>
							<View style={MainStyleSheet.colOne}>
								<PrimaryButton onPress={submitHabitHandler} title="Create Habit" />
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

AddHabitScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Add New Habit',
		headerStyle: {
            backgroundColor: Colors.backgroundDark,
            borderBottomColor: 'black',
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerTintColor: Colors.accent
	}
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		height: '100%',
		padding: 24
	}
});

export default AddHabitScreen;