import React, { useState } from "react";
import { StyleSheet, View, LayoutChangeEvent } from "react-native";

const markTopMargin = 1;
const markBottomMargin = 1;

interface ProgressProps {
	percent: number;
}

export default function Progress({ percent }: ProgressProps) {
    // console.log("[Progress]", percent);
    const [markHeight, setMarkHeight] = useState(360);
    var uniqueId = 0;
    //console.log("mark height is:", markHeight)

	let bars = [];

	for (let i = 0; i < percent; i++) {
		bars.push(
			<View
				style={{
					height: markHeight,
					marginTop: markTopMargin,
					marginRight: 0,
					marginBottom: markBottomMargin,
					marginLeft: 0,
					backgroundColor: "#FFFFFF22",
				}}
				key={uniqueId++}
			></View>
		);
	}

	return (
		<View style={styles.progContainer} onLayout={onLayout}>
			{bars}
		</View>
	);

	function onLayout(event: LayoutChangeEvent) {
		setMarkHeight(Math.round((event.nativeEvent.layout.height / 100) - markTopMargin - markBottomMargin));
	}
}

const styles = StyleSheet.create({
	progContainer: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: "flex-end",
	},
});
