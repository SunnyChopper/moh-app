import React from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import PrimaryButton from '../../components/base/PrimaryButton';
import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import Card from '../../components/base/Card';

import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const HabitDetailsScreen = props => {
	const habitID = useSelector(state => state.habits.current_habit_id);
	const habit = useSelector(state => state.habits.habits[habitID]);
	const fontColor = (priority) => {
		switch (priority) {
			case "High": return "red";
			case "Medium": return "orange";
			case "Low": return "green";
			default: return Colors.primary;
		}
	};

	const levelIDs = [1, 2];
	const levelArray = {
		1: {
			id: 1,
			order: 1,
			title: "Run 1 track lap",
			description: ""
		},
		2: {
			id: 2,
			order: 2,
			title: "Run 2 track laps",
			description: ""
		}
	};

	const levels = levelIDs.map((id) => {
		const description = (levelArray[id].description == "") ? null : <Text style={{...MainStyleSheet.text, marginBottom: 0}}>{levelArray[id].description}</Text>;

		return (
			<Card style={{marginVertical: 12}} key={id}>
				<Text style={MainStyleSheet.headingTwo}>{levelArray[id].title}</Text>
				{description}
				<Text style={MainStyleSheet.boldtext}>Level {levelArray[id].order}</Text>
			</Card>
		);
	});

	return (
		<View style={styles.screen}>
			<ScrollView style={{...MainStyleSheet.scrollView, flex: 1}}>
				<View style={MainStyleSheet.container}>
					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Text style={{...MainStyleSheet.headingOne, marginBottom: 8}}>{habit.title}</Text>
							<Text style={{...MainStyleSheet.text, fontSize: 16, lineHeight: 24, marginBottom: 8}}>{habit.description}</Text>

							<View style={MainStyleSheet.row}>
								<View style={{...MainStyleSheet.colOneHalf, alignItems: 'flex-start', justifyContent: 'center'}}>
									<Text style={{...MainStyleSheet.headingThree, color: fontColor(habit.priority), marginBottom: 0}}>{habit.priority} Priority</Text>
								</View>
								<View style={{...MainStyleSheet.colOneHalf, alignItems: 'flex-end', justifyContent: 'center'}}>
									<Text style={{...MainStyleSheet.text, fontSize: 18}}>Current Level: {habit.level}</Text>
								</View>
							</View>
						</View>
					</View>

					<View style={{...MainStyleSheet.row, marginTop: 16}}>
						<View style={MainStyleSheet.colOne}>
							{levels}
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={styles.bottomFooter}>
				<PrimaryButton onPress={() => { console.log('Mark as complete.') }} title="Mark Complete for Today" />
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
        			iconName = { Platform.OS === 'android' ? 'md-settings' : 'ios-settings' }
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
	},
	bottomFooter: {
		paddingTop: 24,
		justifyContent: 'flex-end'
	}
});

export default HabitDetailsScreen;