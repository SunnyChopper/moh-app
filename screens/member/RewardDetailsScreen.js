import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { userError, userSuccess, userLoading, getUser } from '../../store/actions/UserActions';
import { rewardError, rewardSuccess, rewardLoading, redeemReward } from '../../store/actions/RewardActions';

import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import PrimaryButton from '../../components/base/PrimaryButton';
import PurchaseSummaryBox from '../../components/base/PurchaseSummaryBox';

import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const RewardDetailsScreen = props => {
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

	const [canPurchase, setCanPurchase] = useState(false);
	const [busy, setBusy] = useState(false);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const user = useSelector(state => state.user.current_user);
	const user_points = useSelector(state => state.user.points);
	const user_error = useSelector(state => state.user.error);
	const user_success = useSelector(state => state.user.success);
	const user_loading = useSelector(state => state.user.loading);
	const user_flag = useSelector(state => state.user.flag);

	const rewardID = useSelector(state => state.rewards.current_reward_id);
	const rewards = useSelector(state => state.rewards.rewards);
	const reward = useSelector(state => state.rewards.rewards[rewardID]);

	const reward_success = useSelector(state => state.rewards.success);
	const reward_error = useSelector(state => state.rewards.error);
	const reward_loading = useSelector(state => state.rewards.loading);
	const reward_flag = useSelector(state => state.rewards.flag);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		if (reward_error != "" && reward_error != null) {
			Alert.alert('Error', reward_error, [{ text: 'OK', onPress: () => { dispatch(rewardError('')) } }])
		}
	}, [reward_error]);

	useEffect(() => {
		if (user_error != "" && user_error != null) {
			Alert.alert('Error', user_error, [{ text: 'OK', onPress: () => { dispatch(userError('')) } }])
		}
	}, [user_error]);

	// Fired once a reward has been created
	useEffect(() => {
		console.log('[LOG] - useEffect for `reward_success` in `RewardDetailsScreen`');
		console.log('[DATA DUMP] - `reward_success` = ' + reward_success);
		console.log('[DATA DUMP] - `reward_flag` = ' + reward_flag);

		if (reward_success == true && reward_flag == 'redeem_reward_success') {
			Alert.alert('Success', 'You have purchased ' + reward.title);
			dispatch(userLoading(true));
			dispatch(getUser(user.id));
		}
	}, [reward_success]);

	// Fired once user points have been retrieved
	useEffect(() => {
		if (user_success == true && user_flag == 'get_user_success') {
			dispatch(userLoading(false));
			dispatch(userSuccess(false));
			props.navigation.navigate('Rewards');
		}
	}, [user_success]);

	useEffect(() => {
		if (reward_loading == true) {
			setBusy(true);
		} else {
			setBusy(false);
		}
	}, [reward_loading]);

	useEffect(() => {
		if (reward != null && user != null) {
			if (reward.points > user.points) {
				setCanPurchase(false);
			} else {
				setCanPurchase(true);
			}
		} else {
			props.navigation.navigate('Rewards');
		}
	}, [reward, user]);

	useEffect(() => {
		console.log('[LOG] - useEffect for `reward` in `RewardDetailsScreen`');
		console.log('[DATA DUMP] - `reward` = ');
		console.log(reward);
	}, [reward]);

	useEffect(() => {
		console.log('First loaded `RewardDetailsScreen`');
	}, []);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const redeem = () => {
		dispatch(redeemReward(rewardID, user.id));
	};

	const renderButton = () => {
		if (canPurchase == true) {
			return (
				<PrimaryButton onPress={redeem} title="Purchase Reward" style={{ backgroundColor: Colors.accent, opacity: 1.0 }} />
			);
		} else {
			return (
				<PrimaryButton onPress={redeemReward} title="Cannot Purchase" textstyle={{ color: '#8a8a8a' }} style={{ backgroundColor: Colors.backgroundLight, opacity: 0.8 }} />
			);
		}
	};

	const renderTitle = () => {
		if (rewardID in rewards) {
			return rewards[rewardID].title;
		} else {
			return '';
		}
	};

	const renderPoints = () => {
		if (rewardID in rewards) {
			return rewards[rewardID].points;
		} else {
			return '';
		}
	}

	const renderDescription = () => {
		if (rewardID in rewards) {
			return rewards[rewardID].description;
		} else {
			return '';
		}
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<View style={styles.screen}>
			<View style={{...MainStyleSheet.container, flex: 1}}>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, padding: 0}}>
						<View style={styles.infoBox}>
							<Text style={{...MainStyleSheet.headingOne, marginBottom: 8 }}>{renderTitle()}</Text>
							<Text style={{...MainStyleSheet.headingThree }}>Points: {renderPoints()}</Text>
						</View>
					</View>
				</View>

				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, padding: 24}}>
						<Text style={MainStyleSheet.boldtext}>Description</Text>
						<Text style={{...MainStyleSheet.text, fontSize: 16, lineHeight: 24 }}>{renderDescription()}</Text>
					</View>
				</View>
			</View>

			<View style={{...MainStyleSheet.container, flex: 1, justifyContent: 'flex-end'}}>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, padding: 0}}>
						<PurchaseSummaryBox currentBalance={user_points} rewardCost={renderPoints()} newBalance={user_points-renderPoints()} />
					</View>
				</View>

				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, padding: 24}}>
						{renderButton()}
					</View>
				</View>
			</View>
		</View>
	);
};

RewardDetailsScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Purchase Reward',
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
        			title="Add Reward"
        			iconName = { Platform.OS === 'android' ? 'md-settings' : 'ios-settings' }
        			onPress = {() => {
        				navData.navigation.navigate('EditReward');
        			}}
        		/>
        	</HeaderButtons>
        )
	};
};

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		flex: 1,
		flexDirection: 'column'
	},
	infoBox: {
		width: '100%',
		backgroundColor: Colors.backgroundLight,
		color: 'white',
		padding: 24
	}
});

export default RewardDetailsScreen;