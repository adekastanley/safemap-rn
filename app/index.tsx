import { StyleSheet, Text, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
const index = () => {
	return (
		<ThemedView style={styles.container} isSafeArea={true}>
			<ThemedText>Sign in</ThemedText>
			<Link href={"/map"}>
				<ThemedText>Map</ThemedText>
			</Link>
		</ThemedView>
	);
};
export default index;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#fff',
		alignItems: "center",
		justifyContent: "center",
	},
});
