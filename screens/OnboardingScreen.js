/* ---------------------- *\
	Libraries 
\* ---------------------- */

import React, { useState } from 'react';
import { AsyncStorage, View, Image, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

/* ---------------------- *\
	Constants
\* ---------------------- */

import Colors from '../constants/Colors.js';

const OnboardingScreen = props => {
	const completeOnboardingHandler = async () => {
		await AsyncStorage.setItem('onboard', JSON.stringify({
			onboard: true
		}));

		props.navigation.navigate('Login');
	};

	return (
		<Onboarding
			onDone = {completeOnboardingHandler}
			onSkip = {completeOnboardingHandler}
			pages = {[
				{
					backgroundColor: Colors.backgroundLight,
					image: <Image style={styles.image} source={require('../assets/scissors.png')} />,
					title: 'Cut Out Your Bad Habits',
					subtitle: 'Start to cut your bad habits in an intelligent manner. Our habit tracker app is based on studies done by top neuroscientists.'
				},
				{
					backgroundColor: Colors.backgroundLight,
					image: <Image style={styles.image} source={require('../assets/analysis.png')} />,
					title: 'Make Intelligent Decisions',
					subtitle: 'Our system will analyze your data to give you the best recommendations to help you break a bad habit.'
				},
				{
					backgroundColor: Colors.backgroundLight,
					image: <Image style={styles.image} source={require('../assets/bars-chart.png')} />,
					title: 'Visually See Your Progress',
					subtitle: 'Don\'t just guess if you\'re making progress, visually see it. If something is wrong, visually identify the problem.'
				}
			]}
		/>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 164,
		height: 164
	}
});

export default OnboardingScreen;