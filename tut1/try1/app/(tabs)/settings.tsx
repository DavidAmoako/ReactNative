import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function settings() {
    return (
        <View>
            <Text style={styles.container}>settings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});