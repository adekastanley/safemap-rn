// import { StyleSheet, Text, View } from "react-native";
// import { ThemedView } from "@/components/ThemedView";
// import { ThemedText } from "@/components/ThemedText";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import Fab from "@/components/fab";

// const Map = () => {
// 	return (
// 		<ThemedView>
// 			<MapView
// 				style={styles.map}
// 				provider={PROVIDER_GOOGLE}
// 				showsUserLocation
// 				showsMyLocationButton
// 				followsUserLocation
// 				aria-live="polite"
// 			/>

// 			<Fab />
// 		</ThemedView>
// 	);
// };
// export default Map;
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
// 	map: {
// 		width: "100%",
// 		height: "100%",
// 	},
// });

////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapComponent from "@/components/MapView";
import AlertFAB from "@/components/AlertFAB";
import AlertModal from "@/components/AlertModal";
import Toast from "@/components/Toast";
import { Alert, AlertType } from "@/types/alert";
import { getAllAlerts, addAlert, currentUser } from "@/data/alerts";
import { getCurrentLocation } from "@/utils/location";

export function Map() {
	const [alerts, setAlerts] = useState<Alert[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [currentAlertType, setCurrentAlertType] = useState<AlertType>("test");
	const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
	const [toast, setToast] = useState({
		visible: false,
		title: "",
		message: "",
		type: "test" as AlertType,
	});

	// Fetch initial alerts and location
	useEffect(() => {
		setAlerts(getAllAlerts());
		loadLocation();
	}, []);

	const loadLocation = async () => {
		const currentLocation = await getCurrentLocation();
		setLocation({
			latitude: currentLocation.latitude,
			longitude: currentLocation.longitude,
		});
	};

	// Handle creating a new alert
	const handleCreateAlert = (type: AlertType) => {
		setCurrentAlertType(type);
		setModalVisible(true);
	};

	// Handle alert submission from modal
	const handleAlertSubmit = (title: string, description: string) => {
		if (location.latitude && location.longitude) {
			const newAlert = addAlert(
				currentAlertType,
				title,
				description,
				location.latitude,
				location.longitude,
				currentUser.id
			);

			// Update alerts list
			setAlerts(getAllAlerts());
			setModalVisible(false);

			// Show confirmation toast
			setToast({
				visible: true,
				title: "Alert Created",
				message: `Your ${getAlertTypeName(currentAlertType)} has been sent.`,
				type: currentAlertType,
			});
		}
	};

	const getAlertTypeName = (type: AlertType): string => {
		switch (type) {
			case "test":
				return "Test Alert";
			case "type1":
				return "Community Alert";
			case "type2":
				return "Emergency Alert";
			default:
				return "Alert";
		}
	};

	const handleToastClose = () => {
		setToast({ ...toast, visible: false });
	};

	return (
		<View style={styles.container}>
			{/* Map Component */}
			<MapComponent alerts={alerts} />

			{/* Alert Creation FAB */}
			<AlertFAB onCreateAlert={handleCreateAlert} />

			{/* Alert Creation Modal */}
			<AlertModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				onSubmit={handleAlertSubmit}
				alertType={currentAlertType}
			/>

			{/* Toast Notification */}
			<Toast
				visible={toast.visible}
				onClose={handleToastClose}
				title={toast.title}
				message={toast.message}
				type={toast.type}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
	},
});

// Export the component as default for Expo Router
export default Map;
////////////////////////////////////////////////////////////////////////////////
