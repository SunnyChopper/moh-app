import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainStyleSheet from '../../styles/MainStyleSheet';
import Colors from '../../constants/Colors';

const Jumbotron = props => {
	return (
		<View style={styles.jumbotron}>
			<View style={MainStyleSheet.container}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.headingThree, marginBottom: 16}}>Your Reward Points</Text>

						<Text style={styles.points}>{props.points}</Text>
					</View>
				</View>
			</View>
		</View>
	);	
};

const styles = StyleSheet.create({
	jumbotron: {
		width: '100%',
		borderRadius: 8,
		backgroundColor: '#F7F7F7',
		paddingHorizontal: 16,
		paddingVertical: 24
	},
	points: {
		fontFamily: 'montserrat-bold',
		fontSize: 48,
		color: Colors.accent,
		marginBottom: 0
	}
});

export default Jumbotron;