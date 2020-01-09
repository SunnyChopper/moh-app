import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Alert, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { rewardError, rewardSuccess, rewardLoading, rewardFlag, updateReward, readReward, getRewardsForUser, deleteReward } from '../../store/actions/RewardActions';

import Input from '../../components/base/Input';
import TextArea from '../../components/base/TextArea';
import PrimaryButton from '../../components/base/PrimaryButton';
import CustomHeaderButton from '../../components/base/CustomHeaderButton';

import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const EditRewardScreen = props => {
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

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [points, setPoints] = useState('');

	const [prevAction, setPrevAction] = useState('');
	const [busy, setBusy] = useState(false);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const currentUserID = useSelector(state => state.user.current_user_id);

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
			Alert.alert('Error', reward_error, [{ text: 'OK', onPress: () => {  } }])
		}
	}, [reward_error]);

	// Fired once a reward has been created
	useEffect(() => {
		console.log('[LOG] - useEffect for `reward_success` in `EditRewardScreen`');
		console.log('[DATA DUMP] - `reward_success` = ' + reward_success);
		console.log('[DATA DUMP] - `reward_flag` = ' + reward_flag);

		if (reward_success == true && reward_flag == 'update_reward_success') {
			console.log('[LOG] - Updated reward successfully...');
			setPrevAction('update_reward_success');
			dispatch(rewardSuccess(false));
			dispatch(rewardLoading(true));
			dispatch(getRewardsForUser(currentUserID));
		} else if (reward_success == true && reward_flag == 'delete_reward_success') {
			console.log('[LOG] - Deleted reward successfully...');
			setPrevAction('delete_reward_success');
			dispatch(rewardSuccess(false));
			dispatch(rewardLoading(true));
			dispatch(getRewardsForUser(currentUserID));
		} else if (reward_success == true && reward_flag == 'get_rewards_for_user_success') {
			console.log('[LOG] - Successfully got rewards from API...');
			dispatch(rewardFlag('update_reward_success'));
			dispatch(rewardSuccess(false));

			if (prevAction === 'update_reward_success') {
				console.log('Navigating to RewardDetails screen...');
				props.navigation.navigate('RewardDetails');
			} else if (prevAction === 'delete_reward_success') {
				console.log('Navigating to Rewards screen...');
				props.navigation.navigate('Rewards');
			}
		} 
	}, [reward_success]);

	// Fired when loading
	useEffect(() => {
		if (reward_loading == true) {
			setBusy(true);
		} else {
			setBusy(false);
		}
	}, [reward_loading]);

	// Fired when reward loaded
	useEffect(() => {
		if (rewardID in rewards) {
			setTitle(reward.title);
			setDescription(reward.description);
			setPoints(reward.points.toString());
		}
	}, [reward]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const titleTextHandler = (title) => {
		setTitle(title);
	};

	const descriptionTextHandler = (description) => {
		setDescription(description);
	};

	const pointsTextHandler = (points) => {
		setPoints(points);
	};

	const submitHandler = () => {
		if (title != "" && description != "" && points != "") {
			const reward = {
				id: rewardID,
				title: title,
				description: description,
				points: points
			};

			dispatch(rewardLoading(true));
			dispatch(updateReward(reward));
		} else {
			Alert.alert('Error', 'Please fill out all fields.');
		}
	};

	const deleteHandler = () => {
		console.log('[LOG] = Delete prompt shows...');
		Alert.alert('Confirm', 'Are you sure you want to delete this reward?', [
			{
				text: 'Yes',
				onPress: () => {
					console.log('[LOG] - User wants to delete reward...');
					dispatch(rewardLoading(true));

					console.log('[LOG] - Reward with ID ' + rewardID + ' is being destroyed...');
					dispatch(deleteReward(rewardID));
				}
			}, 
			{
				text: 'Cancel',
				onPress: () => {
					console.log('[LOG] - User did not want to delete reward...');
				}
			}
		]);
	};

	const isBusy = () => {
		return (
			<ActivityIndicator size="large" color={Colors.accent} />
		);
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<TouchableWithoutFeedback style={styles.screen} onPress={Keyboard.dismiss}>
			{busy == true ? isBusy() :
				<View style={{width: '100%', height: '100%'}}>
					<KeyboardAvoidingView behavior="padding" style={{...MainStyleSheet.container, padding: 24, flex: 1}}>
						<View style={MainStyleSheet.row}>
							<View style={MainStyleSheet.colOne}>
								<Text style={MainStyleSheet.headingOne}>Create Reward</Text>
							</View>
						</View>

						<View style={{...MainStyleSheet.row, marginTop: 8}}>
							<View style={MainStyleSheet.colOne}>
								<Input label="Title" value={title} changeText={titleTextHandler} />
							</View>
						</View>

						<View style={{...MainStyleSheet.row, marginTop: 8}}>
							<View style={MainStyleSheet.colOne}>
								<TextArea label="Description" numLines={4} height={75} text={description} changeText={descriptionTextHandler} />
							</View>
						</View>

						<View style={{...MainStyleSheet.row, marginTop: 8}}>
							<View style={MainStyleSheet.colOne}>
								<Input label="Points" keyboardType="number-pad" value={points} changeText={pointsTextHandler} />
							</View>
						</View>
					</KeyboardAvoidingView>

					<View style={{...MainStyleSheet.container, justifyContent: "flex-end", padding: 24}}>
						<View style={MainStyleSheet.row}>
							<View style={MainStyleSheet.colOne}>
								<PrimaryButton title="Update Reward" style={{backgroundColor: Colors.accent}} onPress={submitHandler} />
							</View>
						</View>

						<View style={{...MainStyleSheet.row, marginTop: 16}}>
							<View style={MainStyleSheet.colOne}>
								<PrimaryButton title="Delete Reward" style={{backgroundColor: Colors.danger}} onPress={deleteHandler} />
							</View>
						</View>
					</View>
				</View>
			}
		</TouchableWithoutFeedback>
	);	
};

EditRewardScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Edit Reward',
		headerStyle: {
            backgroundColor: Colors.backgroundDark,
            borderBottomColor: 'black',
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerTintColor: Colors.accent
	};
};

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default EditRewardScreen;