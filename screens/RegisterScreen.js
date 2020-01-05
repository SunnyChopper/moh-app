import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Input from '../components/base/Input';

import MainStyleSheet from '../styles/MainStyleSheet';

const RegisterScreen = props => {
	return (
		<View style={styles.screen}>
			<View style={MainStyleSheet.container}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.headingOne, textAlign: 'center'}}>Register Screen</Text>
						<Text style={{...MainStyleSheet.text, textAlign: 'center'}}>Create the register flow here.</Text>		
					</View>
				</View>
			</View>
		</View>
	);	
};

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		flex: 1,
		flexDirection: 'column',
		padding: 24,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default RegisterScreen;