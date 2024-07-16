import * as React from "react";
import { Link } from "expo-router";
import {
    Text,
    StyleSheet,
    Pressable,
} from "react-native";

export function ButtonSecondary({
    text,
    page
}: {
    text: string;
    page: string;
}) {

    return (
        <Link push href={page} asChild>
            <Pressable style={styles.button} onPress={() => { }}>
                <Text style={styles.buttonText}>{text}</Text>
            </Pressable>
        </Link>);
};

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "InterMedium",
        color: "#000",
        textAlign: "center"
    },
    button: {
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 1,
        borderRadius: 8,
        backgroundColor: "#eee",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        marginBottom: 29
    }
});

