import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TimeListProps {
	times: string[];
}

export default function TimeList(props: TimeListProps) {
	var uniqueId = 0;
	// console.log("[TimeList]")

	return (
		<View style={styles.lapTimes}>
			{props.times.map((lapTime: string, indx: number) => {
				return (
					<View key={uniqueId++}>
						<Text style={styles.text}>{`${indx + 1}. ${lapTime}`}</Text>
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	lapTimes: {
		backgroundColor: "#00000060",
		padding: 0,
	},
	text: {
        color: "#fff",
        marginTop: 2,
        marginRight: 8,
        marginBottom: 2,
        marginLeft: 8
	},
});
