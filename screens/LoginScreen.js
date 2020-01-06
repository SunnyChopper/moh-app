import React, { useState, useEffect } from 'react';
import { AsyncStorage, TouchableWithoutFeedback, Alert, Keyboard, KeyboardAvoidingView, Image, View, Text, TextInput, StyleSheet } from 'react-native';
import * as UserActions from '../store/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../components/base/Card';
import Input from '../components/base/Input';
import PrimaryButton from '../components/base/PrimaryButton';

import { loginUser, clearError, errorLoggingIn, overwriteUser } from '../store/actions/UserActions';

import MainStyleSheet from '../styles/MainStyleSheet';

const LoginScreen = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [memoryLogin, setMemoryLogin] = useState(false);
	const [memoryUser, setMemoryUser] = useState([]);

	const dispatch = useDispatch();
	const error = useSelector(state => state.user.error);
	const isLoggedIn = useSelector(state => state.user.is_logged_in);
	const currentUserID = useSelector(state => state.user.current_user_id);
	const currentUser = useSelector(state => state.user.current_user);

	const fetchCurrentUser = async () => {
		await AsyncStorage.getItem('current_user').then((value) => {
			var user = JSON.parse(value);
			if (user != null) {
				dispatch(overwriteUser(user));
			}
		});
	}

	const emailTextHandler = (email) => {
		setEmail(email);
	};

	const passwordTextHandler = (password) => {
		setPassword(password);
	}

	const submitHandler = () => {
		// Validation
		if (email === '') {
			dispatch(errorLoggingIn('Please enter in a email.'));
			return;
		}

		if (password === '') {
			dispatch(errorLoggingIn('Please enter in a password.'));
			return;
		}
		
		dispatch(loginUser(email, password));
	}

	useEffect(() => {
		fetchCurrentUser();
	}, []);

	useEffect(() =>  {
		if (isLoggedIn == true) {
			AsyncStorage.setItem('current_user_id', JSON.stringify(currentUserID));

			AsyncStorage.setItem('current_user', JSON.stringify(currentUser));

			AsyncStorage.setItem('is_logged_in', JSON.stringify(isLoggedIn));

			props.navigation.navigate('Home');
		}
	}, [isLoggedIn, currentUser, currentUserID]);

	useEffect(() => {
		if (memoryLogin == true && memoryUser != null) {
			console.log('Logging in from memory...');
			console.log(memoryUser);
			dispatch(overwriteUser(memoryUser));
			props.navigation.navigate('Home');
		}
	}, [memoryLogin, memoryUser]);

	useEffect(() => {
		if (error != "") {
			Alert.alert('Error', error, [
				{
					text: 'OK',
					onPress: () => {
						dispatch(clearError());
					} 
				}
			]);
		}
	}, [error]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView style={styles.screen} behavior="padding" keyboardVerticalOffset={50}>
				<View style={styles.screen}>
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
				</View>
			
				<View style={styles.footer}>
					<Text onPress={() => { props.navigation.navigate('Register') }} style={{...MainStyleSheet.text, textAlign: 'center'}}>Don't have an account? Sign up.</Text>
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		flexDirection: 'column',
		paddingHorizontal: 24
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