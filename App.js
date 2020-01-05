/* -------------------- *\
	Libraries
\* -------------------- */

import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

/* -------------------- *\
	Navigators
\* -------------------- */

import MasterNavigator from './navigation/MasterNavigator';

/* -------------------- *\
	Reducers
\* -------------------- */

import RootReducer from './store/reducers/RootReducer';
const store = createStore(RootReducer, applyMiddleware(ReduxThunk));

/* -------------------- *\
	Fonts
\* -------------------- */

const fetchFonts = () => {
	return Font.loadAsync({
		'montserrat' : require('./assets/fonts/Montserrat-Regular.ttf'),
		'montserrat-bold' : require('./assets/fonts/Montserrat-Bold.ttf'),
		'montserrat-light' : require('./assets/fonts/Montserrat-Light.ttf')
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish = {() => {
					setFontLoaded(true);
				}}
			/>
		);
	}

	return (
		<Provider store={store}>
			<MasterNavigator />
		</Provider>
	);
}
