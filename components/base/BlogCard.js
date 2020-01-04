import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const BlogCard = props => {
	return (
		<View style={styles.blogCard}>
			<View style={styles.imageContainer}>
				<Image source={{uri: props.uri}} style={styles.image} />
			</View>

			<View style={styles.infoContainer}>
				<Text style={styles.title}>{props.title}</Text>
				<Text style={styles.snippet}>{props.snippet}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	blogCard: {
		width: '100%',
		backgroundColor: Colors.backgroundLight,
		shadowColor: '#000',
		shadowRadius: 6,
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 0,
			height: 2
		},
		elevation: 4,
		marginVertical: 8
	},
	imageContainer: {
		width: '100%',
		height: 150,
		overflow: 'hidden'
	},
	image: {
		width: '100%',
		height: 150,
		overflow: 'hidden'
	},
	infoContainer: {
		padding: 24
	},
	title: {
		fontSize: 20,
		lineHeight: 24,
		color: Colors.primary,
		marginBottom: 8
	},
	snippet: {
		fontSize: 14,
		lineHeight: 21,
		color: '#2a2a2a',
		marginBottom: 0
	}
});

export default BlogCard;