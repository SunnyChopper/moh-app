import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Alert, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { rewardError, rewardSuccess, rewardLoading, createReward, readReward, getRewardsForUser } from '../../store/actions/RewardActions';

import Input from '../../components/base/Input';
import TextArea from '../../components/base/TextArea';
import PrimaryButton from '../../components/base/PrimaryButton';
import CustomHeaderButton from '../../components/base/CustomHeaderButton';

import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const AddRewardScreen = props => {
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

	const [busy, setBusy] = useState(false);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const currentUserID = useSelector(state => state.user.current_user_id);

	const reward_success = useSelector(state => state.rewards.success);
	const reward_error = useSelector(state => state.rewards.error);
	const reward_loading = useSelector(state => state.rewards.loading);

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
		if (reward_success == true) {
			dispatch(rewardSuccess(false));
			dispatch(getRewardsForUser(currentUserID));
			props.navigation.navigate('Rewards');
		}
	}, [reward_success]);

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
				user_id: currentUserID,
				title: title,
				description: description,
				points: points
			};

			dispatch(rewardLoading(true));
			dispatch(createReward(reward));
		} else {
			Alert.alert('Error', 'Please fill out all fields.');
		}
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
								<PrimaryButton title="Create Reward" style={{backgroundColor: Colors.accent}} onPress={submitHandler} />
							</View>
						</View>
					</View>
				</View>
			}
		</TouchableWithoutFeedback>
	);	
};

AddRewardScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Create Reward',
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

export default AddRewardScreen;