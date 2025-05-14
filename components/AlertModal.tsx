import React, { useState } from "react";
import {
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import {
	X,
	CircleAlert as AlertCircle,
	TriangleAlert as AlertTriangle,
	BellRing,
} from "lucide-react-native";
import colors from "@/styles/colors";
import { AlertType } from "@/types/alert";

interface Props {
	visible: boolean;
	onClose: () => void;
	onSubmit: (title: string, description: string) => void;
	alertType: AlertType;
}

export default function AlertModal({
	visible,
	onClose,
	onSubmit,
	alertType,
}: Props) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const getAlertTypeInfo = () => {
		switch (alertType) {
			case "test":
				return {
					title: "Create Test Alert",
					color: colors.alert.test,
					icon: <BellRing size={24} color={colors.white} />,
				};
			case "type1":
				return {
					title: "Create Community Alert",
					color: colors.alert.type1,
					icon: <AlertTriangle size={24} color={colors.white} />,
				};
			case "type2":
				return {
					title: "Create Emergency Alert",
					color: colors.alert.type2,
					icon: <AlertCircle size={24} color={colors.white} />,
				};
			default:
				return {
					title: "Create Alert",
					color: colors.primary[500],
					icon: <AlertCircle size={24} color={colors.white} />,
				};
		}
	};

	const alertInfo = getAlertTypeInfo();

	const handleSubmit = () => {
		// Generate a default title if none provided
		const finalTitle = title.trim() || getDefaultTitle();
		// Use a default description if none provided
		const finalDescription =
			description.trim() || "No additional details provided.";

		onSubmit(finalTitle, finalDescription);
		// Reset form
		setTitle("");
		setDescription("");
	};

	const getDefaultTitle = () => {
		switch (alertType) {
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

	return (
		<View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={visible}
				onRequestClose={onClose}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={styles.centeredView}
					>
						<View style={styles.modalView}>
							{/* Header */}
							<View
								style={[styles.header, { backgroundColor: alertInfo.color }]}
							>
								<View style={styles.iconContainer}>{alertInfo.icon}</View>
								<Text style={styles.headerText}>{alertInfo.title}</Text>
								<TouchableOpacity style={styles.closeButton} onPress={onClose}>
									<X size={24} color={colors.white} />
								</TouchableOpacity>
							</View>

							{/* Content */}
							<View style={styles.content}>
								<Text style={styles.label}>Alert Title</Text>
								<TextInput
									style={styles.input}
									placeholder={`Enter ${alertInfo.title.toLowerCase()} title`}
									value={title}
									onChangeText={setTitle}
									placeholderTextColor={colors.neutral[400]}
									maxLength={50}
								/>

								<Text style={styles.label}>Description</Text>
								<TextInput
									style={[styles.input, styles.textArea]}
									placeholder="Enter details about the situation"
									value={description}
									onChangeText={setDescription}
									placeholderTextColor={colors.neutral[400]}
									multiline
									numberOfLines={4}
									textAlignVertical="top"
									maxLength={200}
								/>

								<Text style={styles.note}>
									Your current location will be included automatically with this
									alert.
								</Text>

								<TouchableOpacity
									style={[
										styles.submitButton,
										{ backgroundColor: alertInfo.color },
									]}
									onPress={handleSubmit}
								>
									<Text style={styles.submitText}>Submit Alert</Text>
								</TouchableOpacity>
							</View>
						</View>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalView: {
		width: "90%",
		maxWidth: 400,
		backgroundColor: colors.white,
		borderRadius: 16,
		overflow: "hidden",
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
	},
	headerText: {
		flex: 1,
		color: colors.white,
		fontFamily: "Inter-Bold",
		fontSize: 18,
		marginLeft: 16,
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		justifyContent: "center",
		alignItems: "center",
	},
	closeButton: {
		width: 32,
		height: 32,
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		padding: 16,
	},
	label: {
		fontFamily: "Inter-Medium",
		fontSize: 14,
		color: colors.neutral[700],
		marginBottom: 8,
	},
	input: {
		fontFamily: "Inter-Regular",
		backgroundColor: colors.neutral[100],
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		color: colors.neutral[800],
		marginBottom: 16,
		borderWidth: 1,
		borderColor: colors.neutral[300],
	},
	textArea: {
		minHeight: 100,
	},
	note: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: colors.neutral[500],
		marginBottom: 24,
		fontStyle: "italic",
	},
	submitButton: {
		borderRadius: 8,
		padding: 16,
		alignItems: "center",
	},
	submitText: {
		fontFamily: "Inter-Bold",
		color: colors.white,
		fontSize: 16,
	},
});
