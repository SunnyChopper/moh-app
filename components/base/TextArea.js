import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const TextArea = props => {
	return (
		<View style={MainStyleSheet.container}>
			<View style={MainStyleSheet.row}>
				<View style={MainStyleSheet.colOne}>
					<Text style={styles.label}>{props.label}:</Text>
				</View>
			</View>

			<View style={{...MainStyleSheet.row, marginTop: 8}}>
				<View style={{...MainStyleSheet.colOne, padding: 12, borderColor: '#EAEAEA', borderWidth: 2, borderRadius: 8}}>
					<TextInput multiline={true} numberOfLines={props.numLines} onChangeText={props.changeText} value={props.text} style={{...styles.textArea, height: props.height}} />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		textAlign: 'left',
		fontFamily: 'montserrat-light',
		fontSize: 16,
		color: '#2a2a2a'
	},
	textArea: {
		width: '100%',
		fontFamily: 'montserrat-light',
		fontSize: 14,
		color: '#2a2a2a'
	}
});

export default TextArea;