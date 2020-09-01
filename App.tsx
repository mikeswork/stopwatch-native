import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Stopwatch from "./components/Stopwatch";

export default function App() {
	return (
		<View style={styles.app}>
			<Stopwatch title="Stopwatch" />
			<StatusBar style="dark" />
		</View>
	);
}

const styles = StyleSheet.create({
	app: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "space-evenly",
	},
});
