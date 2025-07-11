import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    useWindowDimensions,
    Pressable,
    TextInput
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react';
import React from 'react'

export default function index() {

    const width = useWindowDimensions().width - 100;
    const height = width / 4;
    const radius = height / 2;
    const zero = height * 2 + 20;
    
    // Calculate dynamic font size based on input length
    const baseFontSize = 60;
    const minFontSize = baseFontSize * 0.5; // 50% of original size
    const maxDisplayWidth = width - 40; // Account for padding
    const averageCharWidth = baseFontSize * 0.6; // Approximate character width
    const maxCharsAtBaseSize = Math.floor(maxDisplayWidth / averageCharWidth);
    
    const calculateFontSize = (text: string) => {
        if (text.length <= maxCharsAtBaseSize) {
            return baseFontSize;
        }
        const scaleFactor = maxCharsAtBaseSize / text.length;
        return Math.max(minFontSize, baseFontSize * scaleFactor);
    };
    
    const canAddMoreChars = (currentText: string) => {
        return calculateFontSize(currentText + "0") >= minFontSize;
    };

    const [line1, setLine1] = useState('0'); // current input
    const [line2, setLine2] = useState('');  // previous input + operator
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(1); // cursor position in line1

    const clearScreen = () => {
        setLine1('0');
        setLine2('');
        setOperator(null);
        setWaitingForOperand(false);
        setCursorPosition(1);
    };

    const inputNumber = (num: string) => {
        if (waitingForOperand) {
            setLine1(num);
            setWaitingForOperand(false);
            setCursorPosition(1);
        } else {
            const newValue = line1 === '0' ? num : line1.slice(0, cursorPosition) + num + line1.slice(cursorPosition);
            // Check if adding this character would make the font too small
            if (canAddMoreChars(line1)) {
                setLine1(newValue);
                setCursorPosition(cursorPosition + 1);
            }
        }
    };

    const inputDot = () => {
        if (waitingForOperand) {
            setLine1('0.');
            setWaitingForOperand(false);
            setCursorPosition(2);
        } else if (!line1.includes('.') && canAddMoreChars(line1)) {
            const newValue = line1.slice(0, cursorPosition) + '.' + line1.slice(cursorPosition);
            setLine1(newValue);
            setCursorPosition(cursorPosition + 1);
        }
    };

    const inputPercent = () => {
        const value = parseFloat(line1) / 100;
        setLine1(value.toString());
    };

    const deleteLastChar = () => {
        if (cursorPosition > 0) {
            if (line1.length > 1) {
                const newValue = line1.slice(0, cursorPosition - 1) + line1.slice(cursorPosition);
                setLine1(newValue);
                setCursorPosition(Math.max(0, cursorPosition - 1));
            } else {
                setLine1('0');
                setCursorPosition(1);
            }
        }
    };

    const doOperation = (nextOperator: string) => {
        if (operator && !waitingForOperand) {
            const result = compute(parseFloat(line2), parseFloat(line1), operator);
            setLine2(result.toString());
            setLine1(result.toString());
        } else {
            setLine2(line1);
        }
        setOperator(nextOperator);
        setWaitingForOperand(true);
    };

    const compute = (first: number, second: number, op: string) => {
        switch (op) {
            case '+': return first + second;
            case '−': return first - second;
            case '×': return first * second;
            case '÷': return second === 0 ? 0 : first / second;
            default: return second;
        }
    };

    const handleOperator = (op: string) => {
        if (operator && !waitingForOperand) {
            const result = compute(parseFloat(line2), parseFloat(line1), operator);
            setLine2(result.toString());
            setLine1(result.toString());
        } else {
            setLine2(line1);
        }
        setOperator(op);
        setWaitingForOperand(true);
    };

    const handleEqual = () => {
        if (operator) {
            const result = compute(parseFloat(line2), parseFloat(line1), operator);
            setLine1(result.toString());
            setLine2('');
            setOperator(null);
            setWaitingForOperand(true);
            setCursorPosition(result.toString().length);
        }
    };

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
                <Text style={styles.dispText1}>{line2 && operator ? `${line2} ${operator}` : ''}</Text>
                <TextInput
                    style={[styles.dispText, { fontSize: calculateFontSize(line1) }]}
                    value={line1}
                    selection={{ start: cursorPosition, end: cursorPosition }}
                    onSelectionChange={(event) => setCursorPosition(event.nativeEvent.selection.start)}
                    showSoftInputOnFocus={false}
                    multiline={false}
                    editable={true}
                />
            </View>

            <View style={styles.keys}>
                <Pressable
                    onPress={clearScreen}
                    style={[styles.keyAsh, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText1}>AC</Text>
                </Pressable>
                <Pressable
                    onPress={inputPercent}
                    style={[styles.keyAsh, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText1}>%</Text>
                </Pressable>
                <Pressable
                    onPress={deleteLastChar}
                    style={[styles.keyAsh, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText1}>⌫</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleOperator('÷')}
                    style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>÷</Text>
                </Pressable>
            </View>

            <View style={styles.keys}>
                <Pressable
                    onPress={() => inputNumber('7')}
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>7</Text>
                </Pressable>
                <Pressable
                    onPress={() => inputNumber('8')}
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>8</Text>
                </Pressable>
                <Pressable
                    onPress={() => inputNumber('9')}
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>9</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleOperator('×')}
                    style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>×</Text>
                </Pressable>
            </View>

            <View style={styles.keys}>
                <Pressable
                    onPress={() => inputNumber('4')}
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>4</Text>
                </Pressable>
                <Pressable
                    onPress={() => inputNumber('5')}
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>5</Text>
                </Pressable>
                <Pressable
                    onPress={() => inputNumber('6')}
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>6</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleOperator('−')}
                    style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>−</Text>
                </Pressable>
            </View>

            <View style={styles.keys}>
                <Pressable
                    onPress={() => inputNumber('1')}
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>1</Text>
                </Pressable>
                <Pressable
                    onPress={() => inputNumber('2')}
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>2</Text>
                </Pressable>
                <Pressable
                    onPress={() => inputNumber('3')}
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>3</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleOperator('+')}
                    style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>+</Text>
                </Pressable>
            </View>

            <View style={styles.keys}>
                <Pressable
                    onPress={() => inputNumber('0')}
                    style={[styles.keyGrey1, { height: height, width: zero, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>0</Text>
                </Pressable>
                <Pressable
                    onPress={inputDot}
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>.</Text>
                </Pressable>
                <Pressable
                    onPress={handleEqual}
                    style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>=</Text>
                </Pressable>
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
    dispText1: {
        color: "#fff",
        fontSize: 30
    },
    display: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginBottom: 40,
        paddingHorizontal: 20
    },
    keys: {
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