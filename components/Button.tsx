import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";

interface ButtonProps {
	text: string;
	pressHandler(): void;
	fontSize?: number;
}

export default function Button({ text, pressHandler, fontSize = 18 }: ButtonProps) {
	// console.log("[Button]");

	return (
		<TouchableHighlight style={styles.button} underlayColor="#ffffff99" onPress={pressHandler}>
			<Text style={{ fontSize: fontSize, textAlign: "center", textTransform: "uppercase", fontWeight: "bold" }}>
				{text}
			</Text>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	button: {
		marginTop: 10,
		marginBottom: 10,
		paddingTop: 10,
		paddingBottom: 10,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: "#00000050",
        backgroundColor: "#cccccc99",
        minWidth: "60%",
	},
});
