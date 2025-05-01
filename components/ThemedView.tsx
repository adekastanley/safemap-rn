import { View, type ViewProps, SafeAreaView } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
	isSafeArea?: boolean;
};

export function ThemedView({
	style,
	lightColor,
	darkColor,
	isSafeArea = false,
	...otherProps
}: ThemedViewProps) {
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"background"
	);

	if (!isSafeArea) {
		return <View style={[{ backgroundColor }, style]} {...otherProps} />;
	}
	return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}
