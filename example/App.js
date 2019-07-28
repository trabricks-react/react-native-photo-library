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
	FlatList,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Image,
}            from 'react-native';

import CameraRoll from "react-native-photo-library";

class App extends React.Component {

	async getImages() {

		let { edges } = await CameraRoll.getPhotos({
			first: 20,
			orderByAsc: this.state?.orderByAsc || false,
			beginCreated: this.state?.beginCreated ? parseInt(this.state?.beginCreated) : null,
			endCreated: this.state?.endCreated ? parseInt(this.state?.endCreated) : null,
		});

		this.setState({ items: edges })
	}

	renderItem({ item, index }) {

		return (
			<View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
				<Image
					style={{ width: 60, height: 60 }}
					source={{ uri: item?.node?.image?.uri }}
				/>
				<View style={{ flex: 1, paddingLeft: 20,  }}>
					<Text>{ item?.node?.image?.filename }</Text>
					<Text>{ item?.node?.image?.width } x { item?.node?.image?.height }</Text>
					<Text>{ item?.node?.timestamp }</Text>
				</View>
			</View>
		);

	}

	render() {
		return (
			<SafeAreaView forceInset={{ top: "always", bottom: "always" }} style={{ flex: 1 }}>
				<View style={{ flexDirection: "row", alignItems: "center",  }}>
					<View style={{ flex: 1, padding: 10, }}>
						<TextInput
							onChangeText={(beginCreated) => this.setState({ beginCreated })}
							value={this.state?.beginCreated}
							style={{ borderWidth: 1, height: 30, }}/>
					</View>
					<View style={{ flex: 1, padding: 10, }}>
						<TextInput
							onChangeText={(endCreated) => this.setState({ endCreated })}
							value={this.state?.endCreated}
							style={{ borderWidth: 1, height: 30, }}/>
					</View>
					<Switch
						value={this.state?.orderByAsc}
						onValueChange={(orderByAsc) => this.setState({ orderByAsc })}
					/>
					<TouchableOpacity
						onPress={() => this.getImages()}
						style={{ paddingHorizontal: 20 }}>
						<Text>Search</Text>
					</TouchableOpacity>
				</View>
				<FlatList
					data={this.state?.items || []}
					renderItem={(props) => this.renderItem(props)}
					style={{ flex: 1 }} />
			</SafeAreaView>
		);
	}

}


export default App;
