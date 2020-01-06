import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
	return (
		<View style={{...styles.card, ...props.style}}>
			{props.children}
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '100%',
		padding: 24,
		backgroundColor: '#FAFAFA',
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

export default Card;