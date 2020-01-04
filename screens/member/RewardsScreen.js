import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/base/CustomHeaderButton';
import Colors from '../../constants/Colors';
import RewardBox from '../../components/base/RewardBox';

const RewardsScreen = props => {
	return (
		<View style={styles.screen}>
			<ScrollView style={styles.scrollView}>
				<RewardBox completed="true" title="30 minutes of Call of Duty" description="I get to play 30 minutes of Call of Duty Modern Warfare." timestamp="Dec 3rd" status="Earned" />
				<RewardBox completed="false" title="30 minutes of Twitter" description="I get to be on Twitter for 30 minutes." timestamp="Dec 3rd" status="Not earned" />
				<RewardBox completed="false" title="30 minutes of hanging out" description="I get to be on hang out with my friends for 30 minutes." timestamp="Dec 3rd" status="Not earned" />
				<RewardBox completed="true" title="Coffee from Dunkin'" description="I get to get myself my favorite coffee from Dunkin'" timestamp="Dec 3rd" status="Earned" />
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