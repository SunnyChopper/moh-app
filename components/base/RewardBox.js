import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainStyleSheet from '../../styles/MainStyleSheet';

const RewardsBox = props => {
	const boxBackgroundColor = props.completed === 'true' ? 'green' : 'red';

	return (
		<View style={{...styles.rewardBox, backgroundColor: boxBackgroundColor}}>
			<View style={MainStyleSheet.container}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={styles.title}>{props.title}</Text>
						<Text style={styles.description}>{props.description}</Text>
					</View>
				</View>

				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOneHalf}>
						<Text style={styles.timestamp}>{props.timestamp}</Text>
					</View>

					<View style={MainStyleSheet.colOneHalf}>
						<Text style={styles.status}>{props.status}</Text>
					</View>
				</View>
			</View>
		</View>
	);	
};

const styles = StyleSheet.create({
	rewardBox: {
		width: '100%',
		padding: 16,
		borderBottomColor: '#2A2A2A',
		borderBottomWidth: 2
	},
	title: {
		color: 'white',
		fontSize: 20,
		fontFamily: 'montserrat-bold',
		marginBottom: 8
	},
	description: {
		color: 'white',
		fontSize: 14,
		lineHeight: 21,
		marginBottom: 8
	},
	timestamp: {
		color: '#E8E8E8',
		fontSize: 13,
		textAlign: 'left',
		marginBottom: 0
	},
	status: {
		color: 'white',
		fontSize: 13,
		textAlign: 'right',
		marginBottom: 0
	}
});

export default RewardsBox;