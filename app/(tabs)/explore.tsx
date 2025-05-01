import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

const features = [
	{
		name: "Alerts",
		text: "learn how alerts work and which ones to use",
	},
	{
		name: "Accounts",
		text: "learn about account types",
	},
];
const Explore = () => {
	return (
		<ThemedView isSafeArea={true} style={styles.container}>
			<ThemedText>Explore SafeMap Features</ThemedText>
			<ThemedView style={styles.itemsContainer}>
				{features.map((item, index) => (
					<Link key={index} href={""}>
						<View style={styles.items}>
							<View style={styles.itemsTitle}>{item.name}</View>
							<View>{item.text}</View>
						</View>
					</Link>
				))}
			</ThemedView>
		</ThemedView>
	);
};
export default Explore;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		maxWidth: 1300,
		marginHorizontal: "auto",
		// backgroundColor: "black",
	},
	itemsContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 5,
	},
	items: {
		backgroundColor: "red",
		width: "20rem",
		height: 200,
		justifyContent: "flex-end",
	},
	itemsTitle: {
		fontWeight: "bold",
		fontSize: 20,
	},
});
