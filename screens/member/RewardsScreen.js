import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import Colors from '../../constants/Colors';
import RewardCard from '../../components/base/RewardCard';

const RewardsScreen = props => {
	return (
		<View style={styles.screen}>
			<ScrollView style={styles.scrollView}>
				<RewardCard title="Call of Duty" description="I get to play 30 minutes of Call of Duty Modern Warfare." points="50" />
				<RewardCard title="Twitter" description="I get to be on Twitter for 30 minutes." points="50" />
				<RewardCard title="Hangout w/ Friends" description="I get to hang out with my friends for 2 hours." points="150" />
				<RewardCard title="Coffee from Dunkin'" description="I get my favorite coffee from Dunkin'." points="75" />
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
		height: '100%'
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
        				console.log('Add habit screen should pop-up.');
        			}}
        		/>
        	</HeaderButtons>
        )
	};
};

export default RewardsScreen;