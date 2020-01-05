import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Input from '../components/base/Input';

import MainStyleSheet from '../styles/MainStyleSheet';

const HabitLogsScreen = props => {
	return (
		<View style={styles.screen}>
			<View style={MainStyleSheet.container}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.headingOne, textAlign: 'center'}}>Habit Logs Screen</Text>
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

export default HabitLogsScreen;