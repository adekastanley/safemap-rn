import React, { useState } from "react";
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	Animated,
	Platform,
} from "react-native";
import {
	Plus,
	CircleAlert as AlertCircle,
	BellRing,
	TriangleAlert as AlertTriangle,
} from "lucide-react-native";
import colors from "@/styles/colors";
import { AlertType } from "@/types/alert";

interface Props {
	onCreateAlert: (type: AlertType) => void;
}

export default function AlertFAB({ onCreateAlert }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const animation = useState(new Animated.Value(0))[0];

	const toggleMenu = () => {
		const toValue = isOpen ? 0 : 1;

		Animated.spring(animation, {
			toValue,
			friction: 6,
			useNativeDriver: Platform.OS !== "web",
		}).start();

		setIsOpen(!isOpen);
	};

	const testAlertStyle = {
		transform: [
			{ scale: animation },
			{
				translateY: animation.interpolate({
					inputRange: [0, 1],
					outputRange: [0, -60],
				}),
			},
		],
	};

	const type1AlertStyle = {
		transform: [
			{ scale: animation },
			{
				translateY: animation.interpolate({
					inputRange: [0, 1],
					outputRange: [0, -120],
				}),
			},
		],
	};

	const type2AlertStyle = {
		transform: [
			{ scale: animation },
			{
				translateY: animation.interpolate({
					inputRange: [0, 1],
					outputRange: [0, -180],
				}),
			},
		],
	};

	const rotation = {
		transform: [
			{
				rotate: animation.interpolate({
					inputRange: [0, 1],
					outputRange: ["0deg", "45deg"],
				}),
			},
		],
	};

	return (
		<View style={styles.container}>
			{/* Test Alert Button */}
			<Animated.View>
				<TouchableOpacity
					// style={{ backgroundColor: "purple", width: "100%" }}
					onPress={() => {
						onCreateAlert("test");
						setIsOpen(false);
						animation.setValue(0);
					}}
					style={[styles.fabSmall, styles.fabTest, testAlertStyle]}
				>
					<BellRing color={colors.white} size={20} />
					<Text style={styles.fabSmallText}>Test</Text>
				</TouchableOpacity>
			</Animated.View>

			{/* Type 1 Alert Button */}
			<Animated.View>
				<TouchableOpacity
					onPress={() => {
						onCreateAlert("type1");
						setIsOpen(false);
						animation.setValue(0);
					}}
					style={[styles.fabSmall, styles.fabType1, type1AlertStyle]}
				>
					<AlertTriangle color={colors.white} size={20} />
					<Text style={styles.fabSmallText}>Alert</Text>
				</TouchableOpacity>
			</Animated.View>

			{/* Type 2 Alert Button */}
			<Animated.View>
				<TouchableOpacity
					style={[styles.fabSmall, styles.fabType2, type2AlertStyle]}
					onPress={() => {
						onCreateAlert("type2");
						setIsOpen(false);
						animation.setValue(0);
					}}
				>
					<AlertCircle color={colors.white} size={20} />
					<Text style={styles.fabSmallText}>Emergency</Text>
				</TouchableOpacity>
			</Animated.View>

			{/* Main FAB */}
			<TouchableOpacity
				style={styles.fab}
				onPress={toggleMenu}
				activeOpacity={0.8}
			>
				<Animated.View style={rotation}>
					<Plus color={colors.white} size={24} />
				</Animated.View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 100,
		right: 24,
		alignItems: "center",
	},
	fab: {
		backgroundColor: colors.primary[600],
		width: 56,
		height: 56,
		// position: "absolute",
		borderRadius: 28,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 1,
	},
	fabSmall: {
		position: "absolute",
		width: 120,
		height: 48,
		borderRadius: 24,

		right: -35,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		flexDirection: "row",
		paddingHorizontal: 16,
		backgroundColor: "purple",
	},
	fabTest: {
		backgroundColor: colors.alert.test,
	},
	fabType1: {
		backgroundColor: colors.alert.type1,
	},
	fabType2: {
		backgroundColor: colors.alert.type2,
	},
	fabSmallText: {
		color: colors.white,
		marginLeft: 8,
		fontFamily: "Inter-Medium",
		fontSize: 14,
	},
});
