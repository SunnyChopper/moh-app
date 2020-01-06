import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import HabitBox from '../../components/base/HabitBox';

import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const AddRewardScreen = props => {
	return (
		<View style={styles.screen}>
			<Text style={MainStyleSheet.headingOne}>Add Reward</Text>
		</View>
	);	
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24
	}
});

export default AddRewardScreen;