import React from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
} from "react-native";
import { User, Settings, Clock } from "lucide-react-native";
import colors from "@/styles/colors";
import { currentUser } from "@/data/alerts";
import AlertCard from "@/components/AlertCard";

export default function ProfileScreen() {
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			{/* Profile Header */}
			<View style={styles.profileHeader}>
				<View style={styles.avatarContainer}>
					<User size={40} color={colors.white} />
				</View>
				<View style={styles.profileInfo}>
					<Text style={styles.name}>{currentUser.name}</Text>
					<Text style={styles.location}>{currentUser.location}</Text>
				</View>
			</View>

			{/* Stats Section */}
			<View style={styles.statsContainer}>
				<View style={styles.statBox}>
					<Text style={styles.statNumber}>{currentUser.alerts.length}</Text>
					<Text style={styles.statLabel}>Alerts Sent</Text>
				</View>

				<View style={[styles.statBox, styles.statBoxBorder]}>
					<Text style={styles.statNumber}>0</Text>
					<Text style={styles.statLabel}>Alerts Verified</Text>
				</View>

				<View style={styles.statBox}>
					<Text style={styles.statNumber}>0</Text>
					<Text style={styles.statLabel}>Days Active</Text>
				</View>
			</View>

			{/* My Alerts Section */}
			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<Clock size={20} color={colors.primary[700]} />
					<Text style={styles.sectionTitle}>My Recent Alerts</Text>
				</View>

				{currentUser.alerts.length > 0 ? (
					currentUser.alerts.map((alert) => (
						<AlertCard key={alert.id} alert={alert} />
					))
				) : (
					<View style={styles.emptyState}>
						<Text style={styles.emptyStateText}>
							You haven't sent any alerts yet. Use the "+" button on the map to
							create an alert when needed.
						</Text>
					</View>
				)}
			</View>

			{/* Settings Section */}
			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<Settings size={20} color={colors.primary[700]} />
					<Text style={styles.sectionTitle}>Settings</Text>
				</View>

				<TouchableOpacity style={styles.settingItem}>
					<Text style={styles.settingText}>Notification Preferences</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.settingItem}>
					<Text style={styles.settingText}>Privacy Settings</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.settingItem}>
					<Text style={styles.settingText}>Account Information</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.settingItem}>
					<Text style={styles.settingText}>Help & Support</Text>
				</TouchableOpacity>
			</View>

			{/* FAQ Section */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

				<View style={styles.faqItem}>
					<Text style={styles.faqQuestion}>How are alerts verified?</Text>
					<Text style={styles.faqAnswer}>
						Alerts are currently not verified automatically. Users should
						exercise judgment when viewing reports and verify through other
						sources when possible.
					</Text>
				</View>

				<View style={styles.faqItem}>
					<Text style={styles.faqQuestion}>
						Is my information shared with others?
					</Text>
					<Text style={styles.faqAnswer}>
						Your personal identity is not shared when you post alerts. Only your
						general location and the alert details are visible to other users.
					</Text>
				</View>

				<View style={styles.faqItem}>
					<Text style={styles.faqQuestion}>
						How far can others see my alerts?
					</Text>
					<Text style={styles.faqAnswer}>
						Alerts are visible to users within approximately a 10 km radius of
						the incident location. This may vary based on the alert type and
						urgency.
					</Text>
				</View>
			</View>

			{/* App version */}
			<Text style={styles.version}>SafeMap v1.0.0</Text>
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
	profileHeader: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.white,
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	avatarContainer: {
		width: 72,
		height: 72,
		borderRadius: 36,
		backgroundColor: colors.primary[500],
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
	},
	profileInfo: {
		flex: 1,
	},
	name: {
		fontFamily: "Inter-Bold",
		fontSize: 20,
		color: colors.neutral[800],
		marginBottom: 4,
	},
	location: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		color: colors.neutral[600],
	},
	statsContainer: {
		flexDirection: "row",
		backgroundColor: colors.white,
		borderRadius: 16,
		marginBottom: 16,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	statBox: {
		flex: 1,
		alignItems: "center",
		padding: 16,
	},
	statBoxBorder: {
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderColor: colors.neutral[200],
	},
	statNumber: {
		fontFamily: "Inter-Bold",
		fontSize: 20,
		color: colors.primary[600],
		marginBottom: 4,
	},
	statLabel: {
		fontFamily: "Inter-Medium",
		fontSize: 14,
		color: colors.neutral[600],
	},
	section: {
		backgroundColor: colors.white,
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	sectionTitle: {
		fontFamily: "Inter-Bold",
		fontSize: 18,
		color: colors.neutral[800],
		marginLeft: 8,
	},
	emptyState: {
		padding: 16,
		backgroundColor: colors.neutral[100],
		borderRadius: 8,
		alignItems: "center",
	},
	emptyStateText: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: colors.neutral[600],
		textAlign: "center",
		lineHeight: 20,
	},
	settingItem: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.neutral[200],
	},
	settingText: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		color: colors.neutral[800],
	},
	faqItem: {
		marginBottom: 16,
	},
	faqQuestion: {
		fontFamily: "Inter-Medium",
		fontSize: 16,
		color: colors.neutral[800],
		marginBottom: 4,
	},
	faqAnswer: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: colors.neutral[700],
		lineHeight: 20,
	},
	version: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: colors.neutral[500],
		textAlign: "center",
		marginBottom: 32,
	},
});
