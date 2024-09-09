import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    useWindowDimensions,
    Pressable
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react';
import React from 'react'

export default function index() {

    const width = useWindowDimensions().width - 100;
    const height = width / 4;
    const radius = height / 2;
    const zero = height * 2 + 20;

    const [line1, setLine1] = useState(0);
    const [line2, setLine2] = useState('0');
    const [line3, setLine3] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                barStyle={"light-content"}
                showHideTransition={"fade"}
                hidden={false}
            />
            <View style={styles.display}>
                <Text style={styles.dispText}>{line3}</Text>
                <Text style={styles.dispText}>{line2}</Text>
                <Text style={styles.dispText}>{line1}</Text>
            </View>
            <View style={styles.keys}>
                <Pressable style={[styles.keyAsh, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText1}>AC</Text></Pressable>
                <Pressable style={[styles.keyAsh, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText1}>+/-</Text></Pressable>
                <Pressable style={[styles.keyAsh, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText1}>%</Text></Pressable>
                <Pressable style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>÷</Text></Pressable>
            </View>
            <View style={styles.keys}>
                <Pressable style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>7</Text></Pressable>
                <Pressable style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>8</Text></Pressable>
                <Pressable style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>9</Text></Pressable>
                <Pressable style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>×</Text></Pressable>
            </View>
            <View style={styles.keys}>
                <Pressable style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>4</Text></Pressable>
                <Pressable style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>5</Text></Pressable>
                <Pressable style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>6</Text></Pressable>
                <Pressable style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>−</Text></Pressable>
            </View>
            <View style={styles.keys}>
                <Pressable style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>1</Text></Pressable>
                <Pressable style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>2</Text></Pressable>
                <Pressable style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>3</Text></Pressable>
                <Pressable style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>+</Text></Pressable>
            </View>
            <View style={styles.keys}>
                <Pressable style={[styles.keyGrey1, { height: height, width: zero, borderRadius: radius }]}><Text style={styles.padText}>0</Text></Pressable>
                <Pressable style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>.</Text></Pressable>
                <Pressable style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}><Text style={styles.padText}>=</Text></Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    padText: {
        color: "#fff",
        fontSize: 35
    },
    padText1: {
        color: "#000",
        fontSize: 35
    },
    dispText: {
        color: "#fff",
        fontSize: 60
    },
    display: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginBottom: 40,
        paddingHorizontal: 20
    },
    keys: {
        //flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        marginBottom: 20
    },
    keyGrey: {
        backgroundColor: "#222",
        margin: 5,
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    keyGrey1: {
        backgroundColor: "#222",
        margin: 5,
        height: 50,
        width: 50,
        justifyContent: "center",
        paddingLeft: 30
    },
    keyAsh: {
        backgroundColor: "#555",
        margin: 5,
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    keyYellow: {
        backgroundColor: "#F4CE14",
        margin: 5,
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    }
})