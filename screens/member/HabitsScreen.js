import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import { readHabit, getHabitsForUser } from '../../store/actions/HabitActions';

import Card from '../../components/base/Card';
import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import HabitBox from '../../components/base/HabitBox';
import PrimaryButton from '../../components/base/PrimaryButton';

import MainStyleSheet from '../../styles/MainStyleSheet';
import Colors from '../../constants/Colors'

const HabitsScreen = props => {
	const dispatch = useDispatch();

	const [noHabits, setNoHabits] = useState(false);

	const currentUserID = useSelector(state => state.user.current_user_id);
	const habitArray = useSelector(state => state.habits.habits);
	const habitIDs = useSelector(state => state.habits.habit_ids);

	const showHabitDetailsScreen = (habit) => {
		const habitID = habit.id;

		// Update Redux value for usage in habit details screen
		dispatch(readHabit(habitID));

		props.navigation.navigate('HabitDetails');
	};

	const renderMachine = (key) => {
		switch (key) {
			case "render_habits":
				return habitIDs.map((id) => {
					return (
						<HabitBox cardPress={showHabitDetailsScreen} id={id} key={id} title={habitArray[id].title} description={habitArray[id].description} level={habitArray[id].level} priority={habitArray[id].priority} points={habitArray[id].points} />  
					);
				});
			case "render_empty":
				return (
					<Card>
						<View style={{...MainStyleSheet.row, marginBottom: 8}}>
							<View style={MainStyleSheet.colOne}>
								<Text style={MainStyleSheet.headingTwo}>No Habits</Text>
								<Text style={MainStyleSheet.text}>No habits were found in your profile. Click below to get started.</Text>
							</View>
						</View>

						<View style={MainStyleSheet.row}>
							<View style={MainStyleSheet.colOneHalf}>
								<PrimaryButton title="Create Habit" onPress={() => { props.navigation.navigate('AddHabit'); }} />
							</View>
						</View>
					</Card>
				);
			default: return null;
		}
	};	

	const habits = habitIDs.map((id) => {
		if (noHabits == false) {
			return (
				<HabitBox cardPress={showHabitDetailsScreen} id={id} key={id} title={habitArray[id].title} description={habitArray[id].description} level={habitArray[id].level} priority={habitArray[id].priority} points={habitArray[id].points} />  
			);
		}
	});

	const markComplete = () => {
		console.log('Mark complete.');
	};

	// Fired once current user ID is pulled in from state
	useEffect(() => {
		if (currentUserID > 0 && currentUserID != null) {
			console.log('Getting habits for user with ID: ' + currentUserID);
			dispatch(getHabitsForUser(currentUserID));
		}
	}, [currentUserID]);

	// Fired once habits array is populated
	useEffect(() => {
		if (habitArray.length > 0) {
			console.log('Have some habits to work with...');
		} else {
			console.log('No habits to work with...');
			setNoHabits(true);
		}
	}, [habitArray]);

	// Fired once no habits have been found

	return (
		<View style={styles.screen}>
			<ScrollView style={styles.scrollView}>
				{noHabits == true ? renderMachine("render_empty") : renderMachine("render_habits")}
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