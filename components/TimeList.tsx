import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

interface TimeListProps {
	times: string[];
}

export default function TimeList(props: TimeListProps) {
    var uniqueId = 0;
	// console.log("[TimeList]")

	return (
        <ScrollView horizontal={true} style={[styles.lapScrollView, !props.times.length && styles.lapScrollViewEmpty]}>
            <View style={styles.lapTimes}>
                {props.times.map((lapTime: string, indx: number, theArray) => {
                    return (
                        <View key={uniqueId++}>
                            <Text style={styles.text}>{`${theArray.length - indx}. ${lapTime}`}</Text>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
	);
}

const styles = StyleSheet.create({
    lapScrollView: {
        minHeight: "19%",
        maxHeight: "19%",
        padding: 5,
        backgroundColor: "#00000060",
		borderRadius: 10
    },
    lapScrollViewEmpty: {
        minHeight: "19%",
        maxHeight: "19%",
        backgroundColor: "#00000020",
		borderRadius: 10
    },
	lapTimes: {
        flex: 0,
        justifyContent: "center",
        flexWrap: "wrap",
        padding: 2
    },
    lapTimesEmpty: {
        minHeight: "19%",
        backgroundColor: "#00000020"
    },
	text: {
        color: "#aaa",
        marginTop: 2,
        marginRight: 14,
        marginBottom: 2,
        marginLeft: 14
	},
});
