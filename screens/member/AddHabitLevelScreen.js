import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import { createLevel, levelError, levelSuccess, levelLoading, getLevelsForHabit } from '../../store/actions/HabitLevelActions';

import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import PrimaryButton from '../../components/base/PrimaryButton';
import Input from '../../components/base/Input';
import TextArea from '../../components/base/TextArea';

import MainStyleSheet from '../../styles/MainStyleSheet';
import Colors from '../../constants/Colors';

const AddHabitLevelScreen = props => {
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

	const [busy, setBusy] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const currentUserID = useSelector(state => state.user.current_user_id);
	const habitID = useSelector(state => state.habits.current_habit_id);
	
	const loading = useSelector(state => state.levels.loading);
	const error = useSelector(state => state.levels.error);
	const success = useSelector(state => state.levels.success);
	const flag = useSelector(state => state.levels.flag);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		if (loading == true) {
			setBusy(true);
		} else {
			setBusy(false);
		}
	}, [loading]);

	useEffect(() => {
		if (error != "" && error != null) {
			Alert.alert('Error', error, [{text: 'OK', onPress: () => { dispatch(levelError('')); }}]);
		}
	}, [error]);

	useEffect(() => {
		if (success == true && flag == 'create_level_success') {
			dispatch(levelSuccess(false));
			dispatch(getLevelsForHabit(habitID));
		} else if (success == true && flag == 'get_levels_for_habit_success') {
			props.navigation.navigate('HabitDetails');
		}
	}, [success]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const titleTextHandler = title => {
		setTitle(title);
	};

	const descriptionTextHandler = description => {
		setDescription(description);
	};

	const submitHandler = () => {
		if (title != "") {
			const postVariables = {
				user_id: currentUserID,
				habit_id: habitID,
				title: title,
				description: description
			};

			dispatch(createLevel(postVariables));
		} else {
			Alert.alert('Error', 'Please fill out a title.');
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
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.screen}>
				<ScrollView style={MainStyleSheet.container}>
					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Text style={{...MainStyleSheet.headingOne}}>Add Habit Level</Text>
							<Text style={{...MainStyleSheet.text}}>Fill out the form below to create a level for your habit.</Text>		
						</View>
					</View>

					<View style={{...MainStyleSheet.row, marginTop: 24}}>
						<View style={MainStyleSheet.colOne}>
							<Input label="Title" autocorrect={false} changeText={titleTextHandler} />
						</View>
					</View>

					<View style={{...MainStyleSheet.row, marginTop: 16}}>
						<View style={MainStyleSheet.colOne}>
							<TextArea label="Description (optional)" numLines={4} height={100} changeText={descriptionTextHandler} />
						</View>
					</View>
				</ScrollView>

				<View style={{justifyContent:'flex-end'}}>
					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<PrimaryButton onPress={submitHandler} title="Create Level" />
						</View>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);	
};

AddHabitLevelScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Add Habit Level',
		headerStyle: {
            backgroundColor: Colors.backgroundDark,
            borderBottomColor: 'black',
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerTintColor: Colors.accent,
        // headerRight: (
        // 	<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        // 		<Item
        // 			title="Edit Habit"
        // 			iconName = { Platform.OS === 'android' ? 'md-settings' : 'ios-settings' }
        // 			onPress = {() => {
        // 				console.log('Edit habit screen should pop-up.');
        // 			}}
        // 		/>
        // 	</HeaderButtons>
        // )
	};
};

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		flex: 1,
		flexDirection: 'column',
		padding: 24,
	}
});

export default AddHabitLevelScreen;