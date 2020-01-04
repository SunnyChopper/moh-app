import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';

import Input from '../../components/base/Input';
import TextArea from '../../components/base/TextArea';
import PrimaryButton from '../../components/base/PrimaryButton';

import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const AddHabitScreen = props => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [why, setWhy] = useState('');
	const [points, setPoints] = useState(0);

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
		console.log("Title: " + title);
		console.log("Description: " + description);
		console.log("Why: " + why);
		console.log("Points: " + points);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={200} style={styles.screen}>
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
								<Input label="Points for Completion" changeText={pointsTextChange} />
							</View>
						</View>

						<View style={{...MainStyleSheet.row, marginTop: 16}}>
							<View style={MainStyleSheet.colOne}>
								<PrimaryButton onPress={submitHabitHandler} title="Create Habit" />
							</View>
						</View>
					</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
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
		width: '100%',
		height: '100%',
		padding: 24,
		justifyContent: 'center'
	}
});

export default AddHabitScreen;