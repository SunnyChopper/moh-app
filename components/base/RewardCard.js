import React from 'react';
import { TouchableWithoutFeedback, View, Image, Text, StyleSheet } from 'react-native';

import MainStyleSheet from '../../styles/MainStyleSheet';
import Colors from '../../constants/Colors';

const RewardCard = props => {
	return (
		<TouchableWithoutFeedback id={props.id} onPress={props.onPress.bind(this, props)}>
			<View style={{...MainStyleSheet.container, ...styles.rewardCard}}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.headingTwo, marginBottom: 2}}>{props.title}</Text>

						<Text style={{...MainStyleSheet.text, lineHeight: 21, marginBottom: 8}}>{props.description}</Text>

						<Text style={{...MainStyleSheet.boldtext, color: Colors.accent, marginBottom: 0}}>Points: {props.points}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);	
};

const styles = StyleSheet.create({
	rewardCard: {
		padding: 16,
		backgroundColor: '#F7F7F7',
		width: '100%',
		marginVertical: 12,
		flex: 1,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 2
		},
		elevation: 4
	}
});

export default RewardCard;