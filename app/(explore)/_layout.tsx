import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { IconSymbol } from "@/components/ui/IconSymbol";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function ExploreLayout() {
	const colorScheme = useColorScheme();
	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Tabs>
				<Tabs.Screen
					name="explore"
					options={{
						title: "Explore",
						tabBarIcon: ({ color }) => (
							<IconSymbol size={28} name="paperplane.fill" color={color} />
						),
						headerShown: true,
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						tabBarIcon: ({ color }) => (
							<IconSymbol size={28} name="paperplane.fill" color={color} />
						),
						headerShown: true,
					}}
				/>
				<Stack.Screen name="+not-found" />
			</Tabs>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
