import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Input from '../components/base/Input';

import MainStyleSheet from '../styles/MainStyleSheet';

const AddHabitLevelScreen = props => {
	return (
		<View style={styles.screen}>
			<View style={MainStyleSheet.container}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.headingOne, textAlign: 'center'}}>Add Habit Level Screen</Text>
						<Text style={{...MainStyleSheet.text, textAlign: 'center'}}>Coming from the "Habit Detail Screen", create the layout to add a new level.</Text>		
					</View>
				</View>
			</View>
		</View>
	);	
};

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		flex: 1,
		flexDirection: 'column',
		padding: 24,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default AddHabitLevelScreen;