import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const PrimaryButton = props => {
	return (
		<TouchableOpacity onPress={props.onPress} activeOpacity={0.8} style={{...styles.button, ...props.style}}>
			<Text style={{...styles.buttonText, ...props.textstyle}}>{props.title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		paddingHorizontal: 16,
		paddingVertical: 8,
		width: '100%',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 16,
		fontFamily: 'montserrat-bold'
	}
});

export default PrimaryButton;