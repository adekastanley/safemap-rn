import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
const index = () => {
	return (
		<View style={{ marginTop: 200, backgroundColor: "white" }}>
			<Link href={"/explore"}>index</Link>
		</View>
	);
};
export default index;
const styles = StyleSheet.create({});
