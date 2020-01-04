import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import BlogCard from '../../components/base/BlogCard';
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const ProfileScreen = props => {
	return (
		<ScrollView style={styles.scrollView}>
			<View style={styles.screen}>
				<View style={MainStyleSheet.container}>
					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Text style={styles.name}>Sunny Singh</Text>
							<Text style={styles.mission}>My mission right now is to become the best coder possible.</Text>
						</View>
					</View>

					<View style={{...MainStyleSheet.row, marginTop: 32, marginBottom: 32}}>
						<View style={MainStyleSheet.colOneThird}>
							<Text style={styles.number}>64</Text>
							<Text style={styles.numberSubtitle}>Hottest Streak</Text>
						</View>

						<View style={MainStyleSheet.colOneThird}>
							<Text style={styles.number}>384</Text>
							<Text style={styles.numberSubtitle}>Total Completed</Text>
						</View>

						<View style={MainStyleSheet.colOneThird}>
							<Text style={styles.number}>5</Text>
							<Text style={styles.numberSubtitle}>Habits Mastered</Text>
						</View>
					</View>

					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Text style={MainStyleSheet.headingTwo}>More Resources</Text>
						</View>
					</View>

					<View style={{...MainStyleSheet.row, height: '100%'}}>
						<View style={MainStyleSheet.colOne}>
							<BlogCard uri="https://www.ed2go.com/binaries/content/gallery/ed2go/products/17194.jpg" title="How To Improve Typing Speed" snippet="You are tired of being a slow typer. Being a slow typer can hold back your productivity and be very frustrating. Being able to type fast is extremely important to me since I am constantly working on my computer. How to improve typing speed can be a diffic..." />
							<BlogCard uri="http://thebrokeprofessional.com/wp-content/uploads/2019/01/burnout-1024x512.png" title="How to Avoid Burnout - Before it Happens" snippet="How can you avoid burnout? You are working hard and have plenty of work to do but you feel exhausted. You don&rsquo;t know where to go from here. It&rsquo;s normal to be working hard in this fast-paced world that we live in. At the same time if you are no..." />
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		height: '100%',
		padding: 32
	},
	name: {
		textAlign: 'center',
		marginTop: 32,
		marginBottom: 8,
		fontSize: 24,
		fontFamily: 'montserrat-bold',
		color: Colors.primary
	},
	mission: {
		textAlign: 'center',
		fontSize: 14,
		lineHeight: 21,
		color: '#2a2a2a',
		fontFamily: 'montserrat-light'
	},
	number: {
		fontSize: 24,
		fontFamily: 'montserrat-bold',
		color: Colors.accent,
		textAlign: 'center'
	},
	numberSubtitle: {
		fontSize: 12,
		fontFamily: 'montserrat-light',
		color: '#8a8a8a',
		textAlign: 'center'
	},
	scrollView: {
		width: '100%',
		height: '100%',
		flex: 1,
		paddingHorizontal: 8,
	}
});

ProfileScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Your Profile',
		headerStyle: {
            backgroundColor: Colors.backgroundDark,
            borderBottomColor: 'black',
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            color: 'white'
        }
	};
};

export default ProfileScreen;