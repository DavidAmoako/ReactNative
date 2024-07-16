import * as React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
} from "react-native";
import { ButtonSecondary } from "@/components/ButtonSecondary";


export default function Start() {


    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.logo} source={require("../assets/images/main-logo.png")} />
                </View>
                <Text style={styles.thenextfarm}>
                    <Text style={styles.the}>The</Text>NextFarm
                </Text>
                <Text style={styles.theNextGeneration}>{`the next generation of farming in
your palm.                by G.A.N.S.A`}</Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text1}>Welcome to </Text>
                <Text style={styles.text2}>TheNextFarm APP</Text>
                <Text style={styles.text3}>
                    Find your daily necessary farm goods.
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <ButtonSecondary text="Consumer" page="/(tabs)" />
                <ButtonSecondary text="Farmer" page="/(intro)" />
            </View>

            <Text style={styles.copyright}>© 2024 TheNextFarm</Text>

        </View>
    );
};

const height = parseInt(String(StatusBar.currentHeight)) * 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#159E42",
        paddingTop: "18%"
    },
    logoContainer: {
        paddingBottom: 25,
        paddingTop: height,
        alignItems: 'center'

    },
    imageContainer: {
        height: 100,
        width: 100,
        alignItems: "center",
    },
    logo: {
        height: "100%",
        width: "100%",
    },
    the: {
        color: "#ff5e03"
    },
    thenextfarm: {
        color: "#f2f2f2",
        fontSize: 36,
        fontFamily: "MontserratBlack",
        textAlign: "left"
    },
    theNextGeneration: {
        fontSize: 15,
        fontFamily: "InterMedium",
        color: "#fff",
        textAlign: "left"
    },
    textContainer: {
        marginTop: 58,
        paddingLeft: 47
    },
    text1: {
        fontSize: 24,
        fontFamily: "MontserratLight",
        color: "#FFFFFF",
        textAlign: "left",
    },
    text2: {
        fontSize: 20,
        fontFamily: "MontserratMedium",
        color: "#FFFFFF",
        textAlign: "left",
        marginBottom: 14
    },
    text3: {
        fontSize: 15,
        fontFamily: "MontserratLight",
        color: "#FFFFFF",
        textAlign: "left",
        marginBottom: 80
    },
    buttonContainer: {
        alignItems: "center",
        paddingHorizontal: 24
    },
    copyright: {
        fontSize: 13,
        fontFamily: "MontserratRegular",
        color: "#fff",
        alignSelf: "center",
        position: "absolute",
        paddingTop: "200%"
    }
})