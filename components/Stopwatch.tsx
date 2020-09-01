import React, { useState, useCallback, useRef, useMemo } from "react";
import { StyleSheet, Text, View, useWindowDimensions, ImageBackground } from "react-native";
import TimeList from "./TimeList";
import Progress from "./Progress";
import Button from "./Button";

interface StopwatchProps {
	title: string;
	tickFrequency?: number;
}

export default function Stopwatch({ title = "Stopwatch", tickFrequency = 100, ...props }: StopwatchProps) {
	console.log("[Stopwatch]");

	const startTime = useRef<number>();

	const [interval, intervalSet] = useState<number | null>(null);
	const [time, setTime] = useState({ msSoFar: 0, currentMs: 0 });
	const [lapTimes, setLapTimes] = useState<string[]>([]);

	const startStop = () => {
		// Start timer
		if (!interval) {
			startTime.current = Date.now();

			// Increment timer every tickFrequency
			const newInterval = setInterval(() => {
				// console.log("msSoFar", msSoFar, "+ Date.now()", Date.now(), "- startTime", startTime )

                let sTime = startTime.current || Date.now();

				setTime(Object.assign({}, time, { currentMs: time.msSoFar + Date.now() - sTime }));
			}, tickFrequency);

			intervalSet(newInterval);

        // Stop timer
		} else {
			clearInterval(interval);
			intervalSet(null);
			// console.log("msSoFar", msSoFar, "= currentMs", currentMs);
			setTime(Object.assign({}, time, { msSoFar: time.currentMs }));
		}
	};

	const reset = () => {
		// Stop timer if running
		if (interval) startStop();

		// Reset all timer data
		intervalSet(null);
		setTime({ msSoFar: 0, currentMs: 0 });
		setLapTimes([]);
	};

	// Not really necessary to memoize this function definition but good for demo purposes.
	const grabLapTime = useCallback(() => {
		var currLapTimes = [...lapTimes];

		var newTime = getDisplayTime();
		// Only capture lap time if it's not 0 and hasn't already been captured
		if (currLapTimes[currLapTimes.length - 1] !== newTime && time.currentMs !== 0) {
			currLapTimes.push(newTime);
			setLapTimes(currLapTimes);
		}

		console.log("[grabLapTime], lap times:", currLapTimes);
	}, [lapTimes, time]);

	function getSeconds(): number {
		return Math.floor((time.currentMs % 60000) / 1000);
	}

	// Get time of timer formatted MM:SS.T (T = Tenth of a second).
	function getDisplayTime() {
		// console.log("[getDisplayTime], current ms:", ms);

		var minutes = Math.floor(time.currentMs / 60000);
		var seconds = Math.floor((time.currentMs % 60000) / 1000);

		// i.e. the number of milliseconds transpired after the current second
		var msBetweenSecs = time.currentMs - seconds * 1000 - minutes * 60 * 1000;
		var secTenth = Math.floor(msBetweenSecs / 100);

		var displayTime =
			(minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds + "." + secTenth;

		// console.log("[getDisplayTime], displayTime:", displayTime)

		return displayTime;
	}

	const isPortrait = useCallback(() => {
        console.log("[isPortrait]")
        const dims = useWindowDimensions();
		// const width = useWindowDimensions().width;
        // const height = useWindowDimensions().height;
        const {width, height} = dims;
        // const width = dims.width;
        // const height = dims.height;
        //const height = 400;
        return height > width;
	},[useCallback()]);

	const percentOfSecond = Math.round((getSeconds() / 60) * 100);

	return (
		<ImageBackground source={require("../assets/bg2.png")} style={isPortrait() ? styles.stopwatch : styles.stopwatchLand}>
			<Progress percent={percentOfSecond} />
			<Text style={styles.header}>{title}</Text>

			<Text style={styles.timeText}>{getDisplayTime()}</Text>

			<View>
                <Button text={interval ? "Pause" : "Start"} pressHandler={startStop} />
                <Button text="Lap" pressHandler={grabLapTime} />
			</View>

			{useMemo(() => {
				return <TimeList times={lapTimes} />;
			}, [lapTimes])}

			<Button text="Reset" pressHandler={reset} fontSize={12} />
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	stopwatch: {
		flex: 1,
        justifyContent: "space-between",
        resizeMode: "cover",
		paddingTop: 60,
		paddingRight: 20,
		paddingBottom: 30,
		paddingLeft: 20,
	},
	stopwatchLand: {
        flex: 1,
        resizeMode: "cover",
		paddingTop: 20,
		paddingRight: 30,
		paddingBottom: 20,
		paddingLeft: 30
	},
	header: {
		fontSize: 40,
		textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "bold"
	},
	timeText: {
		textAlign: "center",
		fontSize: 60,
	},
});
