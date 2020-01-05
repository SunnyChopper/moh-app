/* ---------------------- *\
	Libraries 
\* ---------------------- */

import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

/* ---------------------- *\
	Screens 
\* ---------------------- */

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import HabitsScreen from '../screens/member/HabitsScreen';
import RewardsScreen from '../screens/member/RewardsScreen';
import ProfileScreen from '../screens/member/ProfileScreen';
import HabitDetailsScreen from '../screens/member/HabitDetailsScreen';
import AddHabitScreen from '../screens/member/AddHabitScreen';
import AddHabitLevelScreen from '../screens/member/AddHabitLevelScreen';
import HabitLogsScreen from '../screens/member/HabitLogsScreen';
import RewardDetailsScreen from '../screens/member/RewardDetailsScreen';
import RegisterScreen from '../screens/RegisterScreen';

/* ---------------------- *\
	Constants 
\* ---------------------- */

import Colors from '../constants/Colors';

/* ---------------------- *\
	Default Nav Options 
\* ---------------------- */

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
	},
	headerTitleStyle: {
		fontFamily: 'montserrat-bold'
	},
	headerBackTitleStyle: {
		fontFamily: 'montserrat'
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const HabitsStackNavigator = createStackNavigator({
	Habits: {
		screen: HabitsScreen
	},
	HabitDetails: {
		screen: HabitDetailsScreen
	},
	AddHabit: {
		screen: AddHabitScreen
	},
	HabitLogs: {
		screen: HabitLogsScreen
	},
	AddHabitLevel: {
		screen: AddHabitLevelScreen
	}
});

const RewardsStackNavigator = createStackNavigator({
	Rewards: {
		screen: RewardsScreen
	},
	RewardDetails: {
		screen: RewardDetailsScreen
	}
});

const ProfileStackNavigator = createStackNavigator({
	Profile: {
		screen: ProfileScreen
	}
});

const LoginNavigator = createSwitchNavigator({
	Login: LoginScreen,
	Register: RegisterScreen
});

const homeTabConfig = {
	Habits: {
		screen: HabitsStackNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<Ionicons name="ios-checkmark-circle-outline" size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarColor: Colors.primary,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'montserrat' }}>Habits</Text>
				) : (
					'Habits'
				)
		}
	},
	Rewards: {
		screen: RewardsStackNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<Ionicons name="ios-ice-cream" size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarColor: Colors.primary,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'montserrat' }}>Rewards</Text>
				) : (
					'Rewards'
				)
		}
	},
	Profile: {
		screen: ProfileStackNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<Ionicons name="ios-contact" size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarColor: Colors.primary,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'montserrat' }}>Profile</Text>
				) : (
					'Profile'
				)
		}
	}
};

const HomeNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(homeTabConfig, {
		activeTintColor: 'white',
		shifting: true,
		barStyle: {
			backgroundColor: Colors.primary
		}
	}) : createBottomTabNavigator(homeTabConfig, {
		tabBarOptions: {
			labelStyle: {
				fontFamily: 'montserrat'
			},
			activeTintColor: Colors.primary
		}
	});

const MainNavigator = createSwitchNavigator({
	Onboard: OnboardingScreen,
	Login: LoginNavigator,
	Home: HomeNavigator
});

export default createAppContainer(MainNavigator);