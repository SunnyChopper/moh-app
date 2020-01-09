import React, { useState, useEffect } from 'react';
import { AsyncStorage, TouchableWithoutFeedback, Alert, Keyboard, KeyboardAvoidingView, Image, View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import * as UserActions from '../store/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';

import { trackEvent, setUserID } from '../analytics/analytics';

import Card from '../components/base/Card';
import Input from '../components/base/Input';
import PrimaryButton from '../components/base/PrimaryButton';

import { getUser, userError, userSuccess, errorLoggingIn, loginUser } from '../store/actions/UserActions';

import Colors from '../constants/Colors';
import MainStyleSheet from '../styles/MainStyleSheet';

const LoginScreen = props => {
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

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [memoryLogin, setMemoryLogin] = useState(false);
	const [memoryUser, setMemoryUser] = useState([]);
	const [busy, setBusy] = useState(false);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const user_error = useSelector(state => state.user.error);
	const user_success = useSelector(state => state.user.success);
	const user_loading = useSelector(state => state.user.loading);
	const user_flag = useSelector(state => state.user.flag);

	const isLoggedIn = useSelector(state => state.user.is_logged_in);
	const currentUserID = useSelector(state => state.user.current_user_id);
	const currentUser = useSelector(state => state.user.current_user);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		fetchCurrentUser();
	}, []);

	useEffect(() => {
		console.log('[LOG] - Effect `user_success` called from LoginScreen');
		console.log('[DATA DUMP] - `user_success` = ' + user_success);
		console.log('[DATA DUMP] - `user_flag` = ' + user_flag);

		if (user_success == true && user_flag == 'login_user_success') {
			saveUserToMemory();
			props.navigation.navigate('Home');
			dispatch(userSuccess(false));
		} else if (user_success == true && user_flag == 'get_user_success') {
			saveUserToMemory();
			trackEvent('EVENT_RELOGIN_SUCCESS');
			dispatch(userSuccess(false));
			props.navigation.navigate('Home');
		}
	}, [user_success]);

	useEffect(() => {
		if (user_error != "") {
			Alert.alert('Error', user_error, [{ text: 'OK', onPress: () => { dispatch(userError('')) }}]);
		}
	}, [user_error]);

	useEffect(() => {
		if (user_loading == true) {
			setBusy(true);
		} else {
			setBusy(false);
		}
	}, [user_loading]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const saveUserToMemory = () => {
		console.log('[LOG] - Function `saveUserToMemory` called from LoginScreen');
		console.log('[DATA DUMP] - `current_user_id` = ' + JSON.stringify(currentUserID));
		console.log('[DATA DUMP] - `current_user` = ' + JSON.stringify(currentUser));

		// Config for analytics
		setUserID(currentUserID);

		// Store into hard drive
		AsyncStorage.setItem('current_user_id', JSON.stringify(currentUserID));
		AsyncStorage.setItem('current_user', JSON.stringify(currentUser));
		AsyncStorage.setItem('is_logged_in', JSON.stringify(isLoggedIn));
	}

	const fetchCurrentUser = async () => {
		console.log('[LOG] - Fetching current user from AsyncStorage');
		setBusy(true);
		await AsyncStorage.getItem('current_user').then((value) => {
			console.log('[DATA DUMP] - `value` = ' + value);
			if (Object.keys(JSON.parse(value)).length > 0) { 
				var user = JSON.parse(value);
				if (user != null) {
					console.log('[LOG] - User with ID ' + user.id + ' fetched from AsyncStorage.');
					console.log('[LOG] - Fetching updated version of the user.');
					dispatch(getUser(user.id));
					setBusy(false);
				}
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

		trackEvent('EVENT_LOGIN_BUTTON_PRESSED');
		
		console.log('[LOG] - Logging in user with email (' + email + ') and password (' + password + ')');
		dispatch(loginUser(email, password));
	}

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
		{busy == true ? isBusy() : 
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
		}
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