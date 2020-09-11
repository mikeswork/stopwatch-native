import React, { useState } from "react";
import { StyleSheet, View, LayoutChangeEvent } from "react-native";

const markMargin = 1;

interface ProgressProps {
	percent: number;
	isLandscape?: boolean;
}

export default function Progress({ percent, isLandscape = false }: ProgressProps) {
	// console.log("[Progress]", percent);
	const [markHeight, setMarkHeight] = useState(360);
	const [markWidth, setMarkWidth] = useState(360);

	var uniqueId = 0;
	//console.log("mark height is:", markHeight)

	let bars = [];

	for (let i = 0; i < percent; i++) {
		const bar = isLandscape ? (
			<View
				style={{
					width: markWidth,
					marginLeft: markMargin,
					marginTop: 0,
					marginRight: markMargin,
					marginBottom: 0,
					backgroundColor: "#FFFFFF11",
				}}
				key={uniqueId++}
			></View>
		) : (
			<View
				style={{
					height: markHeight,
					marginTop: markMargin,
					marginRight: 0,
					marginBottom: markMargin,
					marginLeft: 0,
					backgroundColor: "#FFFFFF11",
				}}
				key={uniqueId++}
			></View>
		);

		bars.push(bar);
	}

	return (
		<View style={[styles.progContainer, isLandscape && styles.progContainerLand]} onLayout={onLayout}>
			{bars}
		</View>
	);

	function onLayout(event: LayoutChangeEvent) {
		setMarkHeight(Math.round(event.nativeEvent.layout.height / 100 - markMargin - markMargin));
		setMarkWidth(Math.round(event.nativeEvent.layout.width / 100 - markMargin - markMargin));
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
	progContainerLand: {
		flexDirection: "row",
	},
});
