import { Alert, AlertType, UserProfile } from "@/types/alert";

// Mock user data
export const currentUser: UserProfile = {
	id: "user-1",
	name: "Stanley Adeka",
	location: "Nigeria",
	alerts: [],
};

// Generate a unique ID
export const generateId = (): string => {
	return Math.random().toString(36).substring(2, 15);
};

// Mock alert data (initial)
export const mockAlerts: Alert[] = [
	{
		id: "alert-1",
		type: "test",
		title: "Test Alert",
		description: "This is a test alert to demonstrate the functionality.",
		latitude: 37.7849,
		longitude: -122.4294,
		timestamp: Date.now() - 1000 * 60 * 15, // 15 minutes ago
		userId: "user-2",
	},
	{
		id: "alert-2",
		type: "type1",
		title: "Suspicious Activity",
		description: "Person in black hoodie looking into car windows on Main St.",
		latitude: 37.7829,
		longitude: -122.4224,
		timestamp: Date.now() - 1000 * 60 * 45, // 45 minutes ago
		userId: "user-3",
	},
	{
		id: "alert-3",
		type: "type2",
		title: "Emergency",
		description: "Car accident at intersection of Market and 4th St.",
		latitude: 37.7879,
		longitude: -122.4074,
		timestamp: Date.now() - 1000 * 60 * 120, // 2 hours ago
		userId: "user-4",
	},
];

// In-memory store for alerts (simulating a database)
let alerts: Alert[] = [...mockAlerts];

// Get all alerts
export const getAllAlerts = (): Alert[] => {
	return [...alerts].sort((a, b) => b.timestamp - a.timestamp);
};

// Get alerts by user
export const getUserAlerts = (userId: string): Alert[] => {
	return alerts
		.filter((alert) => alert.userId === userId)
		.sort((a, b) => b.timestamp - a.timestamp);
};

// Add a new alert
export const addAlert = (
	type: AlertType,
	title: string,
	description: string,
	latitude: number,
	longitude: number,
	userId: string
): Alert => {
	const newAlert: Alert = {
		id: generateId(),
		type,
		title,
		description,
		latitude,
		longitude,
		timestamp: Date.now(),
		userId,
	};

	alerts = [newAlert, ...alerts];

	// Also add to current user's alerts for profile page
	if (userId === currentUser.id) {
		currentUser.alerts = [newAlert, ...currentUser.alerts];
	}

	return newAlert;
};

// Get alert descriptions and info for the explore page
export const getAlertInfo = () => {
	return [
		{
			type: "test",
			title: "Test Alert",
			description:
				"Use this for testing or practicing with the app. No real emergency.",
			icon: "🔵", // Will be replaced with proper icon
			color: "#3498db",
		},
		{
			type: "type1",
			title: "Community Alert",
			description:
				"For suspicious activity, minor incidents, or potential safety concerns.",
			icon: "🟡", // Will be replaced with proper icon
			color: "#f39c12",
		},
		{
			type: "type2",
			title: "Emergency Alert",
			description:
				"For serious situations requiring immediate attention like accidents, fires, or dangerous individuals.",
			icon: "🔴", // Will be replaced with proper icon
			color: "#e74c3c",
		},
	];
};
