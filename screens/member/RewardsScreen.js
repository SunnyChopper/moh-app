import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { rewardError, rewardSuccess, rewardLoading, readReward, getRewardsForUser } from '../../store/actions/RewardActions';

import MainStyleSheet from '../../styles/MainStyleSheet';
import Colors from '../../constants/Colors';

import Card from '../../components/base/Card';
import PrimaryButton from '../../components/base/PrimaryButton';
import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import RewardCard from '../../components/base/RewardCard';
import Jumbotron from '../../components/base/Jumbotron';

const RewardsScreen = props => {
	/* -------------------------- *\
	|  Screen                      |
	|------------------------------|
	|  1. Dispatch                 |
	|  2. State variables          |
	|  3. Selectors                |
	|  4. Effects                  |
	|  5. Functions                |
	|  6. Render                   |
	\* -------------------------- */

	/* -------------------- *\
	|  1. Dispatch           |
	\* -------------------- */

	const dispatch = useDispatch();

	/* -------------------- *\
	|  2. State variables    |
	\* -------------------- */

	const [noRewards, setNoRewards] = useState(true);
	const [busy, setBusy] = useState(false);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const currentUserID = useSelector(state => state.user.current_user_id);
	const currentUser = useSelector(state => state.user.current_user);
	const currentPoints = useSelector(state => state.user.points);

	const reward_error = useSelector(state => state.rewards.error);
	const reward_success = useSelector(state => state.rewards.success);
	const reward_loading = useSelector(state => state.rewards.loading);

	const rewards = useSelector(state => state.rewards.rewards);
	const rewardIDs = useSelector(state => state.rewards.reward_ids);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	// Fired once current user ID is pulled in from state
	useEffect(() => {
		if (currentUserID > 0 && currentUserID != null) {
			console.log('Getting rewards for user with ID ' + currentUserID);
			dispatch(rewardLoading(true));
			dispatch(getRewardsForUser(currentUserID));
		}
	}, [currentUserID]);

	// Fired once rewards array is populated
	useEffect(() => {
		if (Object.keys(rewards).length > 0) {
			setNoRewards(false);
		} else {
			setNoRewards(true);
		}
	}, [rewards]);

	// Fired once success occurs
	useEffect(() => {
		if (reward_success == true) {
			dispatch(rewardSuccess(false));
		}
	}, [reward_success]);

	// Fired once error comes up
	useEffect(() => {
		if (reward_error != "") {
			Alert.alert('Error', reward_error, [{ text: 'OK', onPress: () => { dispatch(rewardError('')) } }]);
		}
	}, [reward_error]);

	// Fired once loading
	useEffect(() => {
		if (reward_loading == true) {
			setBusy(true);
		} else {
			setBusy(false);
		}
	}, [reward_loading]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const isBusy = () => {
		return (
			<ActivityIndicator size="large" color={Colors.accent} />
		);
	};

	const showRewardDetailsScreen = (reward) => {
		const rewardID = reward.id;

		// Update Redux value
		dispatch(readReward(rewardID));

		// Switch to reward details screen
		props.navigation.navigate('RewardDetails');
	};

	const renderMachine = (key) => {
		switch (key) {
			case "render_rewards":
				return rewardIDs.map((id) => {
					return (
						<RewardCard onPress={showRewardDetailsScreen} id={id} key={id} title={rewards[id].title} description={rewards[id].description} points={rewards[id].points} />  
					);
				});
			case "render_empty":
				return (
					<Card>
						<View style={{...MainStyleSheet.row, marginBottom: 8}}>
							<View style={MainStyleSheet.colOne}>
								<Text style={MainStyleSheet.headingTwo}>No Rewards</Text>
								<Text style={MainStyleSheet.text}>No rewards were found in your profile. Click below to get started.</Text>
							</View>
						</View>

						<View style={MainStyleSheet.row}>
							<View style={MainStyleSheet.colOneHalf}>
								<PrimaryButton title="Create Reward" onPress={() => { props.navigation.navigate('AddReward'); }} />
							</View>
						</View>
					</Card>
				);
			default: return null;
		}
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<View style={styles.screen}>
			{busy == true ? isBusy() : 
				<View style={{...MainStyleSheet.container, flex: 1}}>
					<View style={{...MainStyleSheet.row}}>
						<View style={{...MainStyleSheet.colOne, padding: 0}}>
							<Jumbotron points={ currentPoints != null ? currentPoints : 0} />
						</View>
					</View>
					<View style={{...MainStyleSheet.row, flex: 1}}>
						<View style={{...MainStyleSheet.colOne, paddingBottom: 0}}>
							<ScrollView style={styles.scrollView}>
								{noRewards == true ? renderMachine('render_empty') : renderMachine('render_rewards')}
							</ScrollView>
						</View>
					</View>
				</View>
			}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	scrollView: {
		width: '100%',
		paddingHorizontal: 16,
		paddingTop: 16,
		height: '70%'
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