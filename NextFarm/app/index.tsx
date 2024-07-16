import * as React from "react";
import { ThemedText } from "@/components/ThemedText";
import {
    Image,
    StyleSheet,
    View,
    Text,
    Pressable,
    StatusBar,
    TextInput
} from "react-native";
import { useState } from "react";

StatusBar.setHidden(false);

export default function SignIn() {

    const [userName, onChangeUsername] = React.useState('');
    const [userPass, onChangePass] = React.useState('');

    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>

            </View>
            <View style={styles.mainInfo}>
                <Text style={styles.mainTitle}>{`Welcome Back 👋
You’ve Been Missed!`}
                </Text>
                <View style={styles.username}>
                    <Text style={styles.text}>Username <Text style={styles.red}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeUsername}
                        value={userName}
                        placeholder="email"
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.password}>
                    <Text style={styles.text}>Password <Text style={styles.red}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePass}
                        value={userPass}
                        placeholder="password"
                        keyboardType="default"
                    />
                </View>
                <ThemedText type="link" style={{ textDecorationLine: "underline", marginBottom: 60 }}>
                    Forgot Password?
                </ThemedText>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={() => { }}>
                        <Text style={styles.click}>Sign In</Text>
                    </Pressable>
                </View>

            </View>
            <View style={styles.signUp}>
                <ThemedText style={styles.text2}>Don't have an account?
                    <ThemedText type="link" style={{ textDecorationLine: "underline" }}>
                        Sign Up
                    </ThemedText>
                </ThemedText>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
    imageContainer: {
        borderColor: "black",
        borderWidth: 2,
        height: "40%",
        width: "100%",
        position: "absolute"
    },
    mainInfo: {
        borderColor: "red",
        borderWidth: 2,
        //flex: 1,
        backgroundColor: "#F5F5F5",
        width: "100%",
        marginTop: "60%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingLeft: 30,
        paddingRight: 30,
    },
    mainTitle: {
        fontSize: 26,
        fontFamily: "InterMedium",
        color: "#000",
        textAlign: "left",
        marginTop: 47,
        marginBottom: "20%"
    },
    username: {
        borderColor: "green",
        borderWidth: 2,
        marginBottom: 20,
    },
    password: {
        borderColor: "blue",
        borderWidth: 2,
    },
    text: {
        fontSize: 18,
        fontFamily: "MontserratMedium",
        color: "#000",
        marginBottom: 10
    },
    text2: {
        fontSize: 14,
        fontFamily: "MontserratMedium",
        color: "#000",
    },
    red: {
        color: "red",
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
    button: {
        borderRadius: 39,
        backgroundColor: "#0c775d",
        width: "100%",
        paddingTop: 16,
        paddingBottom: 16,
    },
    click: {
        fontSize: 18,
        fontFamily: "MontserratMedium",
        color: "#fff",
        textAlign: "center",
    },
    signUp: {
        borderColor: "green",
        borderWidth: 2,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1
    }
});