import * as React from "react";
import { Link } from "expo-router";
import { Image, StyleSheet, Pressable } from "react-native";

export function NextImage({
    page
}: {
    page: string;
}) {

    return (
        <Link replace href={page} style={styles.link} asChild>
            <Pressable style={styles.container}>
                <Image style={styles.icon} resizeMode="cover" source={require("../assets/images/botton_circle.png")} />
            </Pressable>
        </Link>);
};

const styles = StyleSheet.create({
    link: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        bottom: 60

    },
    icon: {
        height: 320,
        width: 320,
    },
    container: {
        height: 120,
        width: 120,
    }
});
