import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const Input = props => {
	return (
		<View style={styles.inputContainer}>
			<Text style={styles.label}>{props.label}:</Text>
			<TextInput {...props} onChangeText={props.changeText.bind(this)} style={styles.formControl} />
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		width: '100%'
	},
	label: {
		marginBottom: 2,
		fontFamily: 'montserrat-light',
		fontSize: 16,
		textAlign: 'left',
		color: '#2A2A2A',
		marginBottom: 4
	},
	formControl: {
		width: '100%',
		height: 48,
		padding: 12,
		fontFamily: 'montserrat-light',
		borderColor: '#EAEAEA',
		borderRadius: 8,
		borderWidth: 2,
		fontSize: 14
	}
});

export default Input;