import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import HabitBox from '../../components/base/HabitBox';
import Colors from '../../constants/Colors'

const HabitsScreen = props => {
	const markComplete = () => {
		console.log('Mark complete.');
	};

	const showHabitDetailsScreen = () => {
		console.log('Show details');
		props.navigation.navigate('HabitDetails');
	};

	return (
		<View style={styles.screen}>
			<ScrollView style={styles.scrollView}>
				<HabitBox cardPress={showHabitDetailsScreen} title="Run Half a Mile" description="I want to get in better shape and get my endurance back." priority="High" level="1" points="25" />
				<HabitBox cardPress={showHabitDetailsScreen} title="Read 3 Chapters" description="I want to start learning more so I can apply it in my life." priority="High" level="2" points="35" />
				<HabitBox title="10 Pieces of Content for Instagram" description="I want to create more content for my Instagram so I can build my brand." priority="Medium" level="1" points="25" onPress={markComplete} />				
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		height: '100%'
	},
	scrollView: {
		width: '100%',
		padding: 24,
		flex: 1
	}
});

HabitsScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Your Habits',
		headerStyle: {
            backgroundColor: Colors.backgroundDark,
            borderBottomColor: 'black',
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerRight: (
        	<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        		<Item
        			title="Add Habit"
        			iconName = { Platform.OS === 'android' ? 'md-add' : 'ios-add' }
        			onPress = {() => { navData.navigation.navigate('AddHabit') }}
        		/>
        	</HeaderButtons>
        )
	};
};

export default HabitsScreen;