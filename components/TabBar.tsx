import { View, Platform } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function TabBar({
	state,
	descriptors,
	navigation,
}: BottomTabBarProps) {
	const { colors } = useTheme();
	const { buildHref } = useLinkBuilder();

	const icon = {
		home: () => <Feather name="home" size={24} color={"#222"} />,
		explore: () => <Feather name="compass" size={24} color={"#222"} />,
	};
	return (
		<View style={styles.tabbar}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				return (
					<PlatformPressable
						key={route.name}
						href={buildHref(route.name, route.params)}
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarButtonTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={styles.tabbarItem}
					>
						<Feather
							name={route.name == "map" ? "map" : "compass"}
							size={24}
							color={isFocused ? "red" : "black"}
						/>

						{/* <Text style={{ color: isFocused ? colors.primary : colors.text }}>
							{label}
						</Text> */}
					</PlatformPressable>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	tabbar: {
		position: "relative",
		gap: "5rem",
		// width: "40%",
		marginHorizontal: "auto",
		bottom: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 35,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 10,
		shadowOpacity: 0.1,
	},
	tabbarItem: {
		flex: 1,
		alignItems: "center",
	},
});
