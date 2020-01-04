import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const HabitDetailsScreen = props => {
	return (
		<View style={styles.screen}>
			<View style={MainStyleSheet.container}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={styles.title}>{props.title}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

HabitDetailsScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Habit Details',
		headerStyle: {
            backgroundColor: Colors.backgroundDark,
            borderBottomColor: 'black',
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerTintColor: Colors.accent,
        headerRight: (
        	<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        		<Item
        			title="Edit Habit"
        			iconName = { Platform.OS === 'android' ? 'md-create' : 'ios-create' }
        			onPress = {() => {
        				console.log('Edit habit screen should pop-up.');
        			}}
        		/>
        	</HeaderButtons>
        )
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		height: '100%',
		padding: 24
	},
	title: {
		color: Colors.accent,
		fontFamily: 'montserrat',
		fontSize: 24
	}
});

export default HabitDetailsScreen;