import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainStyleSheet from '../../styles/MainStyleSheet';

const RewardDetailsScreen = props => {
	return (
		<View style={styles.screen}>
			<View style={MainStyleSheet.container}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.headingOne, textAlign: 'center'}}>Reward Details</Text>
						<Text style={{...MainStyleSheet.text, textAlign: 'center'}}>Create the layout to show the reward and the remaining balance after purchasing!</Text>
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

export default RewardDetailsScreen;