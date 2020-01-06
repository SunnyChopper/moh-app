import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { readReward } from '../../store/actions/RewardActions';

import MainStyleSheet from '../../styles/MainStyleSheet';
import Colors from '../../constants/Colors';

import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import RewardCard from '../../components/base/RewardCard';
import Jumbotron from '../../components/base/Jumbotron';

const RewardsScreen = props => {
	const dispatch = useDispatch();
	const current_reward_id = useSelector(state => state.rewards.current_reward_id);
	const rewardIDs = [1, 2, 3, 4];
	const rewards = {
		1: {
			id: 1,
			title: "Call of Duty",
			description: "I get to play 30 minutes of Call of Duty Modern Warfare.",
			points: 50
		},
		2: {
			id: 2,
			title: "Twitter",
			description: "I get to be on Twitter for 30 minutes.",
			points: 50
		},
		3: {
			id: 3,
			title: "Hangout w/ Friends",
			description: "I get to hang out with my friends for 2 hours.",
			points: 150
		},
		4: {
			id: 4,
			title: "Coffee from Dunkin'",
			description: "I get my favorite coffee from Dunkin'.",
			points: 75
		}
	};
	dispatch({ type: "get_rewards_for_user", payload: rewards });

	const rewardCardPressHandler = (reward) => {
		const rewardID = reward.id;

		// Update Redux value
		dispatch(readReward(rewardID));

		props.navigation.navigate('RewardDetails');
	};

	const rewardCards = rewardIDs.map((rewardID) => {
		return (
			<RewardCard key={rewards[rewardID].id} id={rewards[rewardID].id} title={rewards[rewardID].title} description={rewards[rewardID].description} points={rewards[rewardID].points} onPress={rewardCardPressHandler} />
		)
	});

	return (
		<View style={styles.screen}>
			<View style={MainStyleSheet.container}>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, padding: 0}}>
						<Jumbotron points="1500" />
					</View>
				</View>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, padding: 0}}>
						<ScrollView style={styles.scrollView}>
							{rewardCards}
						</ScrollView>
					</View>
				</View>
			</View>
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
		height: '100%',
		paddingHorizontal: 16,
		paddingVertical: 16
	}
});

RewardsScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Your Rewards',
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
        			title="Add Reward"
        			iconName = { Platform.OS === 'android' ? 'md-add' : 'ios-add' }
        			onPress = {() => {
        				navData.navigation.navigate('AddReward')
        			}}
        		/>
        	</HeaderButtons>
        )
	};
};

export default RewardsScreen;