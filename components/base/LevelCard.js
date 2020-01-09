import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const LevelCard = props => {
	const description = (props.description == "") ? null : <Text style={{...MainStyleSheet.text, marginBottom: 8}}>{props.description}</Text>;

	return (
		<TouchableWithoutFeedback id={props.id} onPress={props.onPress.bind(this, props.id)}>
			<View style={{...MainStyleSheet.container, ...styles.card, ...props.cardStyle}}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.headingThree, marginBottom: 8}}>{props.title}</Text>
						{description}
						<Text style={MainStyleSheet.boldtext}>Level {props.level}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#f7f7f7',
		padding: 24,
		borderRadius: 8,
		shadowColor: 'rgb(0, 0, 0)',
		shadowOpacity: 0.2,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 2
		},
		elevation: 5
	}
});

export default LevelCard;