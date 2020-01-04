/* ---------------------- *\
	Libraries 
\* ---------------------- */

import React, { useState, useEffect, useRef } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

/* ---------------------- *\
	Navigators 
\* ---------------------- */

import AppNavigator from './AppNavigator';

const MasterNavigator = props => {
	const [onboard, setOnboard] = useState(false);

	const fetchOnboard = async () => {
		const hasOnboarded = await AsyncStorage.getItem('onboard').then((value) => {
			var returnJSON = JSON.parse(value);
			var flag = returnJSON["onboard"];
			setOnboard(flag);
		});
	}

	const navRef = useRef();

	useEffect(() => {
		fetchOnboard();
	}, []);

	useEffect(() => {
		if (onboard == false) {
			navRef.current.dispatch(
				NavigationActions.navigate({
					routeName : 'Onboard'
				})
			);
		} else {
			navRef.current.dispatch(
				NavigationActions.navigate({
					routeName : 'Home'
				})
			);
		}
	}, [onboard]);

	return <AppNavigator ref={navRef} />;
};

export default MasterNavigator;