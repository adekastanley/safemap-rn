import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import {
	CircleAlert as AlertCircle,
	TriangleAlert as AlertTriangle,
	BellRing,
	Shield,
} from "lucide-react-native";
import colors from "@/styles/colors";
import { getAlertInfo } from "@/data/alerts";

export default function ExploreScreen() {
	const alertInfo = getAlertInfo();

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			{/* App Introduction */}
			<View style={styles.section}>
				<View style={styles.header}>
					<Shield
						size={24}
						color={colors.primary[700]}
						style={styles.headerIcon}
					/>
					<Text style={styles.title}>About SafeMap</Text>
				</View>

				<Text style={styles.paragraph}>
					SafeMap helps communities stay informed about local security incidents
					and potential dangers. With real-time alerts and notifications, you
					can stay aware of what's happening around you and make safer
					decisions.
				</Text>

				<Text style={styles.paragraph}>
					Our goal is to improve community safety through better communication,
					especially in areas where traditional safety resources may be limited.
				</Text>
			</View>

			{/* How It Works */}
			<View style={styles.section}>
				<Text style={styles.subtitle}>How It Works</Text>

				<View style={styles.infoCard}>
					<Text style={styles.infoTitle}>View Alerts</Text>
					<Text style={styles.infoText}>
						See real-time safety incidents on the map. Color-coded pins indicate
						the type and severity of each alert.
					</Text>
				</View>

				<View style={styles.infoCard}>
					<Text style={styles.infoTitle}>Report Incidents</Text>
					<Text style={styles.infoText}>
						Use the "+" button on the map to report an incident. Your location
						will be included automatically to help others stay informed.
					</Text>
				</View>

				<View style={styles.infoCard}>
					<Text style={styles.infoTitle}>Get Notified</Text>
					<Text style={styles.infoText}>
						Receive notifications when new alerts are reported near your
						location, helping you stay aware of potential safety concerns.
					</Text>
				</View>
			</View>

			{/* Alert Types */}
			<View style={styles.section}>
				<Text style={styles.subtitle}>Alert Types</Text>

				{alertInfo.map((info) => {
					let AlertIcon;
					switch (info.type) {
						case "test":
							AlertIcon = BellRing;
							break;
						case "type1":
							AlertIcon = AlertTriangle;
							break;
						case "type2":
							AlertIcon = AlertCircle;
							break;
						default:
							AlertIcon = AlertCircle;
					}

					return (
						<View
							key={info.type}
							style={[styles.alertCard, { borderLeftColor: info.color }]}
						>
							<View
								style={[styles.iconContainer, { backgroundColor: info.color }]}
							>
								<AlertIcon size={24} color={colors.white} />
							</View>
							<View style={styles.alertInfo}>
								<Text style={styles.alertTitle}>{info.title}</Text>
								<Text style={styles.alertDescription}>{info.description}</Text>
							</View>
						</View>
					);
				})}
			</View>

			{/* Community Safety */}
			<View style={styles.section}>
				<Text style={styles.subtitle}>Community Safety Tips</Text>

				<View style={styles.tipCard}>
					<Text style={styles.tipTitle}>Stay Aware</Text>
					<Text style={styles.tipText}>
						Always be aware of your surroundings, especially in unfamiliar areas
						or at night.
					</Text>
				</View>

				<View style={styles.tipCard}>
					<Text style={styles.tipTitle}>Verify Information</Text>
					<Text style={styles.tipText}>
						While alerts are helpful, always try to verify information from
						multiple sources when possible.
					</Text>
				</View>

				<View style={styles.tipCard}>
					<Text style={styles.tipTitle}>Report Responsibly</Text>
					<Text style={styles.tipText}>
						Only report incidents you've personally witnessed or have reliable
						information about. False reports can cause unnecessary panic.
					</Text>
				</View>
			</View>

			{/* Footer */}
			<View style={styles.footer}>
				<Text style={styles.footerText}>
					SafeMap is committed to community safety and privacy. We don't track
					or store personal data beyond what's necessary for the app's core
					functionality.
				</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.neutral[50],
	},
	contentContainer: {
		padding: 16,
	},
	section: {
		marginBottom: 24,
		backgroundColor: colors.white,
		borderRadius: 16,
		padding: 16,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	headerIcon: {
		marginRight: 12,
	},
	title: {
		fontFamily: "Inter-Bold",
		fontSize: 22,
		color: colors.neutral[800],
	},
	subtitle: {
		fontFamily: "Inter-Bold",
		fontSize: 18,
		color: colors.neutral[800],
		marginBottom: 16,
	},
	paragraph: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		color: colors.neutral[700],
		marginBottom: 16,
		lineHeight: 24,
	},
	infoCard: {
		backgroundColor: colors.primary[50],
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
	},
	infoTitle: {
		fontFamily: "Inter-Bold",
		fontSize: 16,
		color: colors.primary[700],
		marginBottom: 8,
	},
	infoText: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: colors.neutral[700],
		lineHeight: 20,
	},
	alertCard: {
		flexDirection: "row",
		backgroundColor: colors.white,
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
		borderLeftWidth: 4,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	iconContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
	},
	alertInfo: {
		flex: 1,
	},
	alertTitle: {
		fontFamily: "Inter-Bold",
		fontSize: 16,
		color: colors.neutral[800],
		marginBottom: 4,
	},
	alertDescription: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: colors.neutral[700],
		lineHeight: 20,
	},
	tipCard: {
		backgroundColor: colors.secondary[50],
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
	},
	tipTitle: {
		fontFamily: "Inter-Bold",
		fontSize: 16,
		color: colors.secondary[700],
		marginBottom: 8,
	},
	tipText: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: colors.neutral[700],
		lineHeight: 20,
	},
	footer: {
		marginTop: 8,
		marginBottom: 32,
		padding: 16,
	},
	footerText: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: colors.neutral[500],
		textAlign: "center",
		lineHeight: 20,
	},
});
