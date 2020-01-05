import React from 'react';
import { TouchableWithoutFeedback, View, Image, Text, StyleSheet } from 'react-native';

import MainStyleSheet from '../../styles/MainStyleSheet';
import Colors from '../../constants/Colors';

const RewardCard = props => {
	return (
		<TouchableWithoutFeedback id={props.id} style={styles.rewardCard} onPress={props.onPress.bind(this)}>
			<View style={MainStyleSheet.container}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.headingOne, marginBottom: 2}}>{props.title}</Text>

						<Text style={{...MainStyleSheet.text, lineHeight: 28, marginBottom: 8}}>{props.description}</Text>

						<Text style={{...MainStyleSheet.text, color: Colors.accent, marginBottom: 0}}>Points: {props.points}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);	
};

const styles = StyleSheet.create({
	rewardCard: {
		padding: 16,
		backgroundColor: '#EDEDED',
		width: '100%'
	}
});

export default RewardCard;