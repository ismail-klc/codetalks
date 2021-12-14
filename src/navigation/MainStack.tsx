import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import { Ionicons } from '@expo/vector-icons';
import Profile from '../screens/Profile';
import { TouchableOpacity, View } from 'react-native';
import {
	Text,
	useTheme,
	themeColor,
} from "react-native-rapi-ui";
import Chat from '../screens/Chat';

const MainStack = createStackNavigator();

const Main = () => {
	const { isDarkmode, setTheme } = useTheme();

	return (
		<MainStack.Navigator>
			<MainStack.Screen name="Home" component={Home}
				options={({ navigation }) => ({
					title: "Odalar",
					headerTintColor: !isDarkmode ? "white" : "black",
					headerStyle: {
						backgroundColor: !isDarkmode ? "#17171E" : themeColor.white100,
					},
					headerRight: () => (
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity
								style={{ alignSelf: "center", marginRight: 10 }}
								onPress={() => {
									isDarkmode ? setTheme("light") : setTheme("dark");
								}}>
								<Text
									size="md"
									fontWeight="bold"
									style={{
										marginLeft: 5,
									}}
								> {isDarkmode ? "☀️" : "🌑"} </Text>
							</TouchableOpacity>
							<Ionicons
								onPress={() => navigation.navigate("Profile")}
								name="person"
								style={{ marginRight: 15 }} size={24} color={
									!isDarkmode ? "white" : "black"
								} />
						</View>)
				})} />
			<MainStack.Screen name="Profile" component={Profile} options={{
				title: "Profil",
				headerTintColor: !isDarkmode ? "white" : "black",
				headerStyle: {
					backgroundColor: !isDarkmode ? "#17171E" : themeColor.white100,
				},
			}} />
			<MainStack.Screen name="Chat" component={Chat} options={{
				title: "Chat Odası",
				headerTintColor: !isDarkmode ? "white" : "black",
				headerStyle: {
					backgroundColor: !isDarkmode ? "#17171E" : themeColor.white100,
				},
			}} />
		</MainStack.Navigator>
	);
};

export default Main;