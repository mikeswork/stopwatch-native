import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

interface TimeListProps {
	times: string[];
	isLandscape?: boolean;
}

export default function TimeList({ times, isLandscape = false }: TimeListProps) {
	var uniqueId = 0;
	console.log("[TimeList]")

	return (
		<ScrollView
			horizontal={true}
			style={[
				styles.lapScrollView,
				!times.length && styles.lapScrollViewEmpty,
				isLandscape && styles.lapScrollViewLand,
			]}
		>
			<View style={styles.lapTimes}>
				{times.map((lapTime: string, indx: number) => {
					return (
						<View key={uniqueId++}>
							<Text style={styles.text}>{`${times.length - indx}. ${lapTime}`}</Text>
						</View>
					);
				})}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	lapScrollView: {
		minHeight: "29%",
		maxHeight: "29%",
		padding: 5,
		backgroundColor: "#ffffff40",
		borderRadius: 10,
	},
	lapScrollViewEmpty: {
		backgroundColor: "#ffffff10",
	},
	lapScrollViewLand: {
		minHeight: "40%",
		maxHeight: "40%",
		minWidth: "77%",
		maxWidth: "77%",
		marginTop: 20,
	},
	lapTimes: {
		flex: 0,
		justifyContent: "center",
		flexWrap: "wrap",
		padding: 2,
	},
	text: {
		color: "#000",
		marginTop: 2,
		marginRight: 14,
		marginBottom: 2,
		marginLeft: 14,
	},
});
