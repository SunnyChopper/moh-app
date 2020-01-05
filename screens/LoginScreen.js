import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Alert, Keyboard, KeyboardAvoidingView, Image, View, Text, TextInput, StyleSheet } from 'react-native';
import * as UserActions from '../store/actions/UserActions';
import { useDispatch } from 'react-redux';

import Card from '../components/base/Card';
import Input from '../components/base/Input';
import PrimaryButton from '../components/base/PrimaryButton';

const LoginScreen = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	const emailTextHandler = (email) => {
		setEmail(email);
	};

	const passwordTextHandler = (password) => {
		setPassword(password);
	}

	const submitHandler = () => {
		setError(null);

		// Validation
		if (email === '') {
			setError('Please enter in a username.');
			return;
		}

		if (password === '') {
			setError('Please enter in a password.');
			return;
		}
		
		let action = userActions.loginUser(email, password);
		try {
			dispatch(action);
		} catch (error) {
			setError(error);
			console.log(error);
		}
	}

	useEffect(() => {
		if (error != "") {
			Alert.alert('Error', error, [{ text: 'OK' }]);
		}
	}, [error]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView style={styles.screen} behavior="padding" keyboardVerticalOffset={50}>
				<View style={styles.logoContainer}>
					<Image style={styles.image} source={{uri: 'https://i.pinimg.com/originals/67/16/2a/67162a403e79255bf78e90b6c42029a3.png'}} />
				</View>
				<View>
					<Text style={styles.title}>Mind of Habit</Text>
				</View>
				<View style={styles.formContainer}>
					<Input label="Email" autocorrect="false" changeText={emailTextHandler} />
				</View>

				<View style={styles.formContainer}>
					<Input secureTextEntry={true} label="Password" autocorrect="false" changeText={passwordTextHandler} />
				</View>

				<View style={styles.formContainer}>
					<PrimaryButton onPress={submitHandler} title="Login" />
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		paddingHorizontal: 24
	},
	logoContainer: {
		width: '100%',
		alignItems: 'center',
		marginBottom: 32
	},
	image: {
		width: 128,
		height: 128,
		shadowColor: '#000000',
		shadowOpacity: 0.25,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 2
		},
		overflow: 'visible' 
	},
	title: {
		fontSize: 32,
		fontFamily: 'montserrat-bold'
	},
	formContainer: {
		width: '80%',
		marginTop: 16
	}
});

export default LoginScreen;