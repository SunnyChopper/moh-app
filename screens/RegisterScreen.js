import React, { useState, useEffect } from 'react';
import { View, Alert, Text, Image, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { trackEvent, setUserID } from '../analytics/analytics';

import { createUser, clearError } from '../store/actions/UserActions';

import Input from '../components/base/Input';
import PrimaryButton from '../components/base/PrimaryButton';

import Colors from '../constants/Colors';
import MainStyleSheet from '../styles/MainStyleSheet';


const RegisterScreen = props => {
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

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const user_error = useSelector(state => state.user.error);
	const user_success = useSelector(state => state.user.success);
	const user_loading = useSelector(state => state.user.loading);
	const user_flag = useSelector(state => state.user.flag);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		if (user_error != "") {
			Alert.alert('Error', user_error, [{ text: 'OK', onPress: () => { dispatch(userError('')) }}]);
		}
	}, [user_error]);

	useEffect(() => {
		if (user_success == true && user_flag == 'create_user_success') {
			saveUserToMemory();
			props.navigation.navigate('Home');
		}
	}, [user_success]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const saveUserToMemory = () => {
		// Set for analytics
		setUserID(currentUserID);

		// Save to hard drive
		AsyncStorage.setItem('current_user_id', JSON.stringify(currentUserID));
		AsyncStorage.setItem('current_user', JSON.stringify(currentUser));
		AsyncStorage.setItem('is_logged_in', JSON.stringify(isLoggedIn));
	}

	const isEmailValid = (email) => {
		let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return pattern.test(String(email).toLowerCase());
	};

	const firstNameTextHandler = (text) => {
		setFirstName(text);
	};

	const lastNameTextHandler = (text) => {
		setLastName(text);
	};

	const emailTextHandler = (text) => {
		setEmail(text);
	};

	const passwordTextHandler = (text) => {
		setPassword(text);
	};

	const registerButtonHandler = () => {
		if (firstName == "" || lastName == "" || email == "" || password == "") {
			console.log("Please fill out all fields.");
			Alert.alert('Error', 'Please fill out all fields.');
		} else {
			if (isEmailValid(email) == false) {
				console.log("Email is not valid.");
				trackEvent('EVENT_INVALID_EMAIL');
				Alert.alert('Error', 'Please enter in a valid email.');
			} else {
				const user = {
					first_name: firstName,
					last_name: lastName,
					email: email,
					password: password
				};

				trackEvent('EVENT_REGISTER_BUTTON_PRESSED');

				dispatch(createUser(user));
			}
		}
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView style={styles.screen} behavior="padding" keyboardVerticalOffset={64}>
				<View style={styles.screen}>
					<View style={MainStyleSheet.container}>
						<View id="header" style={MainStyleSheet.row}>
							<View style={MainStyleSheet.colOne}>
								<View style={styles.logoContainer}>
									<Image style={styles.image} source={{uri: 'https://i.pinimg.com/originals/67/16/2a/67162a403e79255bf78e90b6c42029a3.png'}} />
								</View>
								<Text style={{...MainStyleSheet.headingOne, textAlign: 'center', marginBottom: 8}}>Register Your Account</Text>
							</View>
						</View>

						<View style={{...MainStyleSheet.row, marginTop: 16}}>
							<View style={{...MainStyleSheet.colOneHalf, paddingRight: 6}}>
								<Input label="First Name" autocorrect={false} changeText={firstNameTextHandler} /> 
							</View>
							<View style={{...MainStyleSheet.colOneHalf, paddingLeft: 6}}>
								<Input label="Last Name" autocorrect={false} changeText={lastNameTextHandler} /> 
							</View>
						</View>

						<View style={{...MainStyleSheet.row, marginVertical: 8}}>
							<View style={MainStyleSheet.colOne}>
								<Input label="Email" autocorrect={false} changeText={emailTextHandler} /> 
							</View>
						</View>

						<View style={{...MainStyleSheet.row, marginBottom: 16}}>
							<View style={MainStyleSheet.colOne}>
								<Input label="Password" autocorrect={false} secureTextEntry={true} changeText={passwordTextHandler} /> 
							</View>
						</View>

						<View style={MainStyleSheet.row}>
							<View style={MainStyleSheet.colOne}>
								<PrimaryButton onPress={registerButtonHandler} title="Register" /> 
							</View>
						</View>
					</View>
				</View>
			
				<View style={styles.footer}>
					<Text onPress={() => { props.navigation.navigate('Login') }} style={{...MainStyleSheet.text, textAlign: 'center'}}>Already have an account? Login.</Text>
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
		
	);	
};

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		padding: 24,
		justifyContent: 'center',
		alignItems: 'center'
	},
	footer: {
		position: 'absolute', 
		bottom: 48
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
	}
});

export default RegisterScreen;