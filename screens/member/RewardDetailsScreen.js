import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import PrimaryButton from '../../components/base/PrimaryButton';
import PurchaseSummaryBox from '../../components/base/PurchaseSummaryBox';

import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const RewardDetailsScreen = props => {
	const rewardID = useSelector(state => state.rewards.current_reward_id);
	const reward = useSelector(state => state.rewards.rewards[rewardID]);
	console.log("Reward ID: " + rewardID);
	console.log(reward);

	const redeemReward = () => {
		console.log("Purchasing reward with ID: " + rewardID);
	};

	return (
		<View style={styles.screen}>
			<View style={{...MainStyleSheet.container, flex: 1}}>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, padding: 0}}>
						<View style={styles.infoBox}>
							<Text style={{...MainStyleSheet.headingOne, marginBottom: 8 }}>{reward.title}</Text>
							<Text style={{...MainStyleSheet.headingThree }}>Points: {reward.points}</Text>
						</View>
					</View>
				</View>

				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, padding: 24}}>
						<Text style={MainStyleSheet.boldtext}>Description</Text>
						<Text style={{...MainStyleSheet.text, fontSize: 16, lineHeight: 24 }}>{reward.description}</Text>
					</View>
				</View>
			</View>

			<View style={{...MainStyleSheet.container, flex: 1, justifyContent: 'flex-end'}}>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, padding: 0}}>
						<PurchaseSummaryBox currentBalance={1500} rewardCost={reward.points} newBalance={1500-reward.points} />
					</View>
				</View>

				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, padding: 24}}>
						<PrimaryButton onPress={redeemReward} title="Purchase Reward" />
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
        				console.log('Edit reward screen should pop-up.');
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