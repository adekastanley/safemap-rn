import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import * as Location from "expo-location";
import { Alert } from "@/types/alert";
import { DEFAULT_LOCATION } from "@/utils/location";
import colors from "@/styles/colors";
import MapMarker from "./MapMarker";

// Only import react-native-maps when not on web
let MapView: any;
let Marker: any;
let Circle: any;
let PROVIDER_GOOGLE: any;
if (Platform.OS !== "web") {
	const RNMaps = require("react-native-maps");
	MapView = RNMaps.default;
	Marker = RNMaps.Marker;
	Circle = RNMaps.Circle;
	PROVIDER_GOOGLE = RNMaps.PROVIDER_GOOGLE;
}

// For web, we  use a different library
import GoogleMapReact from "google-map-react";

interface Props {
	alerts: Alert[];
	onMapPress?: (event: any) => void;
}

export default function MapComponent({ alerts, onMapPress }: Props) {
	const [location, setLocation] = useState(DEFAULT_LOCATION);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	// console.log(alerts);
	const getRadius = () => {
		switch (alerts.type) {
			case "test":
				return 150;
			case "type1":
				return 400;
			case "type2":
				return 600;
			case "user":
				return 75;
			default:
				return 300;
		}
	};

	// const getStrokeColor = () => {
	// 	switch (alerts.type) {
	// 		case "test":
	// 			return colors.alert.test;
	// 		case "type1":
	// 			return colors.alert.type1;
	// 		case "type2":
	// 			return colors.alert.type2;
	// 		case "user":
	// 			return colors.primary[500];
	// 		default:
	// 			return colors.primary[500];
	// 	}
	// };

	useEffect(() => {
		(async () => {
			try {
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					setErrorMsg("Permission to access location was denied");
					return;
				}

				const position = await Location.getCurrentPositionAsync({});
				setLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				});
			} catch (error) {
				console.error("Error getting location:", error);
				setErrorMsg("Failed to get current location");
			}
		})();
	}, []);

	// Render for native platforms (iOS, Android)
	if (Platform.OS !== "web") {
		return (
			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				initialRegion={location}
				showsUserLocation={true}
				showsMyLocationButton={true}
				onPress={onMapPress}
			>
				{alerts.map((alert) => (
					<>
						{" "}
						<Marker
							key={alert.id}
							coordinate={{
								latitude: alert.latitude,
								longitude: alert.longitude,
							}}
							title={alert.title}
							description={alert.description}
							pinColor={
								alert.type === "test"
									? colors.alert.test
									: alert.type === "type1"
									? colors.alert.type1
									: colors.alert.type2
							}
						/>
						{/* <Circle
							center={{
								latitude: alert.latitude,
								longitude: alert.longitude,
							}}
							radius={40} // radius in meters
							strokeColor={
								alert.type === "test"
									? colors.alert.test
									: alert.type === "type1"
									? colors.alert.type1
									: colors.alert.type2
							}
							fillColor="rgba(255,0,0,0.1)" // translucent fill
							strokeWidth={2}
						/> */}
						<Circle
							center={{
								latitude: alert.latitude,
								longitude: alert.longitude,
							}}
							radius={getRadius()} // radius in meters
							strokeColor={
								alert.type === "test"
									? colors.alert.test
									: alert.type === "type1"
									? colors.alert.type1
									: colors.alert.type2
							}
							fillColor="rgba(255,0,0,0.1)" // translucent fill
							strokeWidth={2}
						/>
					</>
				))}
			</MapView>
		);
	}

	// Render for web
	return (
		<View style={styles.map}>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "",
				}}
				defaultCenter={{
					lat: location.latitude,
					lng: location.longitude,
				}}
				defaultZoom={14}
				onClick={onMapPress}
			>
				{/* Current location marker */}
				<MapMarker
					lat={location.latitude}
					lng={location.longitude}
					type="user"
					text="You"
				/>

				{/* Alert markers */}
				{alerts.map((alert) => (
					<MapMarker
						key={alert.id}
						lat={alert.latitude}
						lng={alert.longitude}
						type={alert.type}
						text={alert.title}
					/>
				))}
			</GoogleMapReact>
		</View>
	);
}

const styles = StyleSheet.create({
	map: {
		width: "100%",
		height: "100%",
	},
});
