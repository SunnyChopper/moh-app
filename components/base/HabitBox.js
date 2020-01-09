import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import PrimaryButton from '../../components/base/PrimaryButton';
import MainStyleSheet from '../../styles/MainStyleSheet';
import Colors from '../../constants/Colors';

const HabitBox = props => {
	return (
		<TouchableWithoutFeedback onPress={props.cardPress.bind(this, props)}>
			<View style={{...MainStyleSheet.container, ...styles.habitBox}}>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, marginBottom: 12}}>
						<Text style={styles.title}>{props.title}</Text>
						<Text style={styles.text}>{props.description}</Text>
						<Text style={styles.points}>Points for Completion: {props.points}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);	
};

const styles = StyleSheet.create({
	habitBox: {
		backgroundColor: '#F7F7F7',
		padding: 16,
		marginVertical: 16,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 2
		},
		elevation: 4
	},
	title: {
		fontFamily: 'montserrat-bold',
		fontSize: 20,
		lineHeight: 25,
		marginBottom: 8,
		color: Colors.accent
	},
	priority: {
		fontFamily: 'montserrat',
		fontSize: 13,
		color: '#8A8A8A',
		marginBottom: 8
	},
	text: {
		fontFamily: 'montserrat-light',
		fontSize: 14,
		lineHeight: 21,
		marginBottom: 8
	},
	points: {
		fontFamily: 'montserrat',
		fontSize: 14,
		marginBottom: 0,
		color: '#2a2a2a'
	}

});

export default HabitBox;