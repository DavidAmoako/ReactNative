import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";


export function Gradient() {
    return (
        <LinearGradient
            style={styles.gradContainer}
            locations={[0.8, 1]}
            colors={
                ['rgba(255, 255, 255, 0)', 'rgba(12, 119, 93, 0.36)']
            }
        />
    );
};

const styles = StyleSheet.create({
    gradContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.7,
        backgroundColor: "transparent"
    },
})