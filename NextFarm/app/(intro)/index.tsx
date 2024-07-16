import * as React from "react";
import { Themes } from "@/constants/Themes";
import { NextImage } from "@/components/NextImage";
import { Gradient } from "@/components/Gradient";

import {
    Image,
    StyleSheet,
    View,
    Text,
    Pressable,
    StatusBar
} from "react-native";


export default function Intro1() {

    return (
        <View style={styles.mainContainer}>
            <Image style={styles.imageContainer} resizeMode="cover" source={require('@/assets/images/intro1.jpg')} />

            <Gradient />

            <View style={styles.skipContainer}>
                <Pressable onPress={() => { }}>
                    <Text style={styles.skipText}>Skip</Text>
                </Pressable>
            </View>

            <View style={styles.slideTextContainer}>
                <Text style={styles.titleText}>Easy Payment</Text>
                <Text style={styles.subtitleText}>{`Easy payment options, like mobile wallets and
contactless cards, simplify transactions,
 allowing users to pay with a simple tap.`}
                </Text>
            </View>

            <Image style={styles.accordIcon} resizeMode="cover" source={require('@/assets/images/page1.png')} />

            <NextImage page="/intro2" />
        </View>);
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Themes.intro.colorWhite,
        flex: 1,
        overflow: "hidden",
    },
    imageContainer: {
        borderBottomLeftRadius: 160,
        height: "52%",
        width: "100%",
        position: "absolute",
    },
    skipContainer: {
        top: 36,
        height: 32,
        alignItems: "flex-end",
        right: 16
    },
    skipText: {
        fontSize: 18,
        fontWeight: "500",
        fontFamily: "InterMedium",
        textAlign: "left",
        color: Themes.intro.colorWhite
    },
    slideTextContainer: {
        alignContent: "center",
        top: "52%",
        alignItems: "center",
    },
    titleText: {
        fontSize: 24,
        fontFamily: "Baloo",
        paddingBottom: 10
    },
    subtitleText: {
        fontSize: 12,
        fontFamily: "MontserratAlternatesRegular",
        textAlign: "center",
    },
    accordIcon: {
        width: 70,
        height: 70,
        top: "55%",
        alignSelf: "center"
    },
    accordIcon2: {
        top: "58%",

    },
});
