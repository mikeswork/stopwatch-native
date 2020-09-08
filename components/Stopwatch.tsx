import React, { useState, useRef, useMemo } from "react";
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

	const [interval, intervalSet] = useState<number | null>(null);
	const [time, setTime] = useState(0);
	const [lapTimes, setLapTimes] = useState<string[]>([]);

    const startTime = useRef<number>();
    const timeBeforeStart = useRef<number>(0);
	const winDims = useWindowDimensions();

	const startStop = () => {
		// Start timer
		if (!interval) {
			startTime.current = Date.now();

			// Increment timer every tickFrequency
			const newInterval = setInterval(() => {
                const transpiredTime = Date.now() - (startTime.current || Date.now());
                setTime(timeBeforeStart.current + transpiredTime);
			}, tickFrequency);

			intervalSet(newInterval);

        // Stop timer
		} else {
			clearInterval(interval);
            intervalSet(null);
            
			timeBeforeStart.current = time;
		}
	};

	const reset = () => {
		// Stop timer if running
		if (interval) startStop();

		// Reset all timer data
		timeBeforeStart.current = 0;
        setTime(0);
		setLapTimes([]);
	};

	const grabCurrentTime = () => {
		var currLapTimes = [...lapTimes];

		var newTime = getDisplayTime();
		// Only capture lap time if it's not 0 and hasn't already been captured
		if (currLapTimes[currLapTimes.length - 1] !== newTime && time !== 0) {
			currLapTimes.unshift(newTime);
			setLapTimes(currLapTimes);
		}

		console.log("[grabCurrentTime], lap times:", currLapTimes);
	};

	function getSeconds(): number {
		return Math.floor((time % 60000) / 1000);
	}

	// Get time of timer formatted MM:SS.T (T = Tenth of a second).
	function getDisplayTime() {
		// console.log("[getDisplayTime], current ms:", ms);

		var minutes = Math.floor(time / 60000);
		var seconds = Math.floor((time % 60000) / 1000);

		// i.e. the number of milliseconds transpired after the current second
		var msBetweenSecs = time - seconds * 1000 - minutes * 60 * 1000;
		var secTenth = Math.floor(msBetweenSecs / 100);

		var displayTime =
			(minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds + "." + secTenth;

		// console.log("[getDisplayTime], displayTime:", displayTime)

		return displayTime;
	}

    const percentOfSecond = Math.round((getSeconds() / 60) * 100);
    
    const isLandscape = winDims.height < winDims.width;

	return (
		<ImageBackground
			source={require("../assets/bg2.png")}
			style={[styles.stopwatch, isLandscape && styles.stopwatchLand]}
		>
            <View style={[styles.header, isLandscape && styles.headerLand]}>
                <Text style={[styles.headerText, isLandscape && styles.headerTextLand]}>{title}</Text>
            </View>

            <View style={[styles.content, isLandscape && styles.contentLand]}>
                <Progress percent={percentOfSecond} />

                <Text style={styles.timeText}>{getDisplayTime()}</Text>
                
                <View style={[styles.buttons, isLandscape && styles.buttonsLand]}>
                    <Button text={interval ? "Pause" : "Start"} pressHandler={startStop} />
                    <Button text="Lap" pressHandler={grabCurrentTime} />
                </View>

                {useMemo(() => {
                    return <TimeList times={lapTimes} />;
                }, [lapTimes])}

                <Button text="Reset" pressHandler={reset} fontSize={12} />
            </View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
    stopwatch: {
		flex: 1,
		justifyContent: "flex-end",
        resizeMode: "cover"
	},
	stopwatchLand: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
		resizeMode: "cover",
		paddingTop: 20,
		paddingRight: 30,
		paddingBottom: 20,
		paddingLeft: 30,
	},
	header: {
        position: "absolute",
        justifyContent: "flex-end",
        top: 0,
        right: 0,
        bottom: "83%",
        left: 0,
        zIndex: 1,
		backgroundColor: "#ffffff40",
    },
    headerLand: {
        position: "absolute",
        justifyContent: "center",
        top: "40%",
        right: 0,
        bottom: "40%",
        left: "-92%",
        backgroundColor: "#ffffff25",
        zIndex: 1,
        
        transform: [{ rotate: "-90deg" }]
    },
    headerText: {
        marginBottom: 10,
        fontSize: 34,
		textAlign: "center",
		textTransform: "uppercase",
        fontWeight: "normal",
        letterSpacing: 10, 
        color: "#111"
    },
    headerTextLand: {
        fontSize: 40,
		textAlign: "center",
		textTransform: "uppercase",
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        maxHeight: "83%",
        justifyContent: "space-between",
        flexDirection: "column",
        paddingTop: 20,
		paddingRight: 20,
		paddingBottom: 20,
        paddingLeft: 20
    },
    contentLand: {
        flex: 1,
        maxWidth: "90%",
        backgroundColor: "blue",
        flexDirection: "row"
    },
	timeText: {
        marginTop: 15,
		textAlign: "center",
        fontSize: 60
    },
    buttons: {
        flex: 0,
        justifyContent: "flex-start"
    },
    buttonsLand: {
        flex: 1
    }
})