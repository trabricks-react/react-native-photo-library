/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
	SafeAreaView,
	ScrollView,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
}            from 'react-native';

const App = () => {
	return (
		<SafeAreaView forceInset={{ top: "always", bottom: "always" }} style={{ flex: 1 }}>
			<View>
				<TextInput/>
				<TextInput/>
				<Switch/>
				<TouchableOpacity>
					<Text>Search</Text>
				</TouchableOpacity>
			</View>
			<ScrollView style={{ flex: 1 }}>

			</ScrollView>
		</SafeAreaView>
	);
};


export default App;
