import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import TabBar from "@/components/TabBar";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				// tabBarStyle: Platform.select({
				// 	ios: {
				// 		// Use a transparent background on iOS to show the blur effect
				// 		position: "absolute",
				// 	},
				// 	default: {},
				// }),
			}}
		>
			<Tabs.Screen
				name="map"
				options={{
					title: "Map",
					// tabBarIcon: ({ color }) => (
					// 	<IconSymbol size={28} name="house.fill" color={color} />
					// ),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
					// tabBarIcon: ({ color }) => (
					// 	<IconSymbol size={28} name="paperplane.fill" color={color} />
					// ),
					headerShown: true,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					// tabBarIcon: ({ color }) => (
					// 	<IconSymbol size={28} name="paperplane.fill" color={color} />
					// ),
					headerShown: true,
				}}
			/>
		</Tabs>
	);
}
