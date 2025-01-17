import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainStyleSheet from '../../styles/MainStyleSheet';
import Colors from '../../constants/Colors';

const PurchaseSummaryBox = props => {
	return (
		<View style={styles.purchaseBox}>
			<View style={{...MainStyleSheet.container, padding: 24}}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={MainStyleSheet.headingOne}>Your Reward Points Purchase</Text>
					</View>
				</View>

				<View style={{...MainStyleSheet.row, marginTop: 0}}>
					<View style={{ ...MainStyleSheet.colOneHalf, flexDirection: 'row'}}>
						<Text style={MainStyleSheet.text}>Your Current Balance</Text>
					</View>

					<View style={{ ...MainStyleSheet.colOneHalf, flexDirection: 'row', justifyContent: 'flex-end'}}>
						<Text style={{...MainStyleSheet.boldtext, color: Colors.accent}}>{props.currentBalance}</Text>
					</View>
				</View>

				<View style={{...MainStyleSheet.row, marginTop: 4}}>
					<View style={{ ...MainStyleSheet.colOneHalf, flexDirection: 'row'}}>
						<Text style={MainStyleSheet.text}>Reward Points Price</Text>
					</View>

					<View style={{ ...MainStyleSheet.colOneHalf, flexDirection: 'row', justifyContent: 'flex-end'}}>
						<Text style={{...MainStyleSheet.boldtext, color: Colors.accent}}>{props.rewardCost}</Text>
					</View>
				</View>

				<View style={{...MainStyleSheet.row, marginTop: 4}}>
					<View style={{ ...MainStyleSheet.colOneHalf, flexDirection: 'row'}}>
						<Text style={MainStyleSheet.text}>Your New Balance</Text>
					</View>

					<View style={{ ...MainStyleSheet.colOneHalf, flexDirection: 'row', justifyContent: 'flex-end'}}>
						<Text style={{...MainStyleSheet.boldtext, color: Colors.accent}}>{props.newBalance}</Text>
					</View>
				</View>
			</View>
		</View>
	);	
};

const styles = StyleSheet.create({
	purchaseBox: {
		backgroundColor: '#F7F7F7',
		width: '100%',
		paddingVertical: 8,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default PurchaseSummaryBox;