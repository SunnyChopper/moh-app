import * as Amplitude from 'expo-analytics-amplitude';

const API_KEY = '8fb9b56b47688ea75b0cbd11ad4f34be';
const SECRET_KEY = '643875d365daea4c44b7d285bb4dce06';

export const initAnalytics = () => {
	Amplitude.initialize(API_KEY);
};

export const trackEvent = (event, options) => {
	if (options != null) {
		Amplitude.logEventWithProperties(event, options);
	} else {
		Amplitude.logEvent(event);
	}
};

export const setUserID = (userID) => {
	Amplitude.setUserId(userID);
};