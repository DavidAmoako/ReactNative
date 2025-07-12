// Import necessary React Native components and hooks
import {
    StyleSheet,    // For creating component styles
    Text,          // For displaying text
    StatusBar,     // For controlling the status bar appearance
    View,          // Basic container component
    useWindowDimensions, // Hook to get device screen dimensions
    Pressable,     // For creating touchable buttons
    TextInput,     // For text input with cursor positioning
    Modal,         // For modal overlays
    FlatList,      // For scrollable lists
    SafeAreaView   // For safe area layout
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react'; // React hooks for state management and side effects
import React from 'react'

// Main calculator component
export default function index() {

    // === LAYOUT CALCULATIONS ===
    // Get device width and calculate button dimensions based on screen size
    const width = useWindowDimensions().width - 100; // Total width minus padding
    const height = width / 4;                        // Button height (1/4 of width)
    const radius = height / 2;                       // Border radius for circular buttons
    const zero = height * 2 + 20;                   // Width for the "0" button (double width)
    
    // === DYNAMIC FONT SIZING ===
    // Calculate font size that scales down as numbers get longer
    const baseFontSize = 60;                         // Default font size for display
    const minFontSize = baseFontSize * 0.5;          // Minimum font size (50% of base)
    const maxDisplayWidth = width - 40;              // Available display width (minus padding)
    const averageCharWidth = baseFontSize * 0.6;     // Approximate width per character
    const maxCharsAtBaseSize = Math.floor(maxDisplayWidth / averageCharWidth); // Max chars at full size
    
    // Function to calculate appropriate font size based on text length
    const calculateFontSize = (text: string) => {
        if (text.length <= maxCharsAtBaseSize) {
            return baseFontSize; // Use full size if text fits
        }
        // Scale down proportionally if text is too long
        const scaleFactor = maxCharsAtBaseSize / text.length;
        return Math.max(minFontSize, baseFontSize * scaleFactor);
    };
    
    // Function to check if we can add more characters without making font too small
    const canAddMoreChars = (currentText: string) => {
        return calculateFontSize(currentText + "0") >= minFontSize;
    };

    // === STATE MANAGEMENT ===
    // All calculator state variables using React hooks
    const [line1, setLine1] = useState('0');                    // Current number being entered/displayed
    const [line2, setLine2] = useState('');                     // Previous number + operator (for display)
    const [operator, setOperator] = useState<string | null>(null); // Current math operation (+, -, ×, ÷)
    const [waitingForOperand, setWaitingForOperand] = useState(false); // Flag: waiting for next number input
    const [cursorPosition, setCursorPosition] = useState(1);     // Cursor position within the input
    
    // === HISTORY STATE MANAGEMENT ===
    // History state for calculation tracking and persistent storage
    const [history, setHistory] = useState<string[]>([]);       // Array of calculation history strings (max 50 items)
    const [isHistoryVisible, setIsHistoryVisible] = useState(false); // Controls visibility of history drawer modal

    // === ASYNC STORAGE FUNCTIONS ===
    // Persistent storage functions for saving/loading calculation history across app sessions
    
    // Load calculation history from device storage on app start
    // This useEffect hook runs once when the component mounts to restore previous calculations
    useEffect(() => {
        loadHistory(); // Restore history from AsyncStorage when app loads
    }, []);

    // Load history from AsyncStorage
    // Attempts to retrieve and parse previously saved calculation history from device storage
    const loadHistory = async () => {
        try {
            const savedHistory = await AsyncStorage.getItem('calculatorHistory');
            if (savedHistory) {
                setHistory(JSON.parse(savedHistory)); // Parse JSON string back to array
            }
        } catch (error) {
            console.log('Error loading history:', error); // Log errors for debugging
        }
    };

    // Save history to AsyncStorage
    // Converts history array to JSON string and stores it persistently on device
    const saveHistory = async (newHistory: string[]) => {
        try {
            await AsyncStorage.setItem('calculatorHistory', JSON.stringify(newHistory));
        } catch (error) {
            console.log('Error saving history:', error); // Log errors for debugging
        }
    };

    // Add new calculation to history
    // Prepends new calculation to history array and maintains a maximum of 50 entries
    const addToHistory = (calculation: string) => {
        const newHistory = [calculation, ...history.slice(0, 49)]; // Keep only last 50 calculations (newest first)
        setHistory(newHistory); // Update state with new history
        saveHistory(newHistory); // Persist to device storage immediately
    };

    // Clear all calculation history
    // Removes all history entries from both state and persistent storage
    const clearHistory = async () => {
        setHistory([]); // Clear state array
        try {
            await AsyncStorage.removeItem('calculatorHistory'); // Remove from device storage
        } catch (error) {
            console.log('Error clearing history:', error); // Log errors for debugging
        }
    };

    // === CALCULATOR FUNCTIONS ===
    
    // Clear all calculator data and reset to initial state
    const clearScreen = () => {
        setLine1('0');                    // Reset display to "0"
        setLine2('');                     // Clear previous operation display
        setOperator(null);                // Clear current operator
        setWaitingForOperand(false);      // Reset operation state
        setCursorPosition(1);             // Reset cursor to position after "0"
    };

    // Handle number input (0-9)
    const inputNumber = (num: string) => {
        if (waitingForOperand) {
            // Start new number after an operator was pressed
            setLine1(num);                    // Replace display with new number
            setWaitingForOperand(false);      // No longer waiting for operand
            setCursorPosition(1);             // Set cursor after the new digit
        } else {
            // Insert digit at current cursor position
            const newValue = line1 === '0' ? num : line1.slice(0, cursorPosition) + num + line1.slice(cursorPosition);
            // Only add the digit if it won't make the font too small
            if (canAddMoreChars(line1)) {
                setLine1(newValue);               // Update display with new digit
                setCursorPosition(cursorPosition + 1); // Move cursor forward
            }
        }
    };

    // Handle decimal point input
    const inputDot = () => {
        if (waitingForOperand) {
            // Start new decimal number after operator
            setLine1('0.');                   // Start with "0."
            setWaitingForOperand(false);      // No longer waiting for operand
            setCursorPosition(2);             // Position cursor after "0."
        } else if (!line1.includes('.') && canAddMoreChars(line1)) {
            // Add decimal point if none exists and font won't be too small
            const newValue = line1.slice(0, cursorPosition) + '.' + line1.slice(cursorPosition);
            setLine1(newValue);               // Insert decimal at cursor position
            setCursorPosition(cursorPosition + 1); // Move cursor forward
        }
    };

    // Handle percentage calculation
    const inputPercent = () => {
        const value = parseFloat(line1) / 100;  // Convert current number to percentage
        setLine1(value.toString());             // Display the result
    };

    // Handle backspace/delete functionality
    const deleteLastChar = () => {
        if (cursorPosition > 0) {              // Only delete if cursor is not at beginning
            if (line1.length > 1) {
                // Remove character before cursor position
                const newValue = line1.slice(0, cursorPosition - 1) + line1.slice(cursorPosition);
                setLine1(newValue);                    // Update display
                setCursorPosition(Math.max(0, cursorPosition - 1)); // Move cursor back
            } else {
                // If only one character left, reset to "0"
                setLine1('0');                         // Reset to initial state
                setCursorPosition(1);                  // Position cursor after "0"
            }
        }
    };

    // Legacy function for operations (kept for compatibility)
    const doOperation = (nextOperator: string) => {
        if (operator && !waitingForOperand) {
            // Complete pending operation if one exists
            const result = compute(parseFloat(line2), parseFloat(line1), operator);
            setLine2(result.toString());          // Store result for next operation
            setLine1(result.toString());          // Display result
        } else {
            // No pending operation, just store current number
            setLine2(line1);                      // Store current number for operation
        }
        setOperator(nextOperator);                // Set the new operator
        setWaitingForOperand(true);               // Wait for next number input
    };

    // Perform mathematical calculations
    const compute = (first: number, second: number, op: string) => {
        switch (op) {
            case '+': return first + second;      // Addition
            case '−': return first - second;      // Subtraction  
            case '×': return first * second;      // Multiplication
            case '÷': return second === 0 ? 0 : first / second; // Division (avoid divide by zero)
            default: return second;               // Return second number if no valid operator
        }
    };

    // Handle operator button presses (+, -, ×, ÷)
    const handleOperator = (op: string) => {
        if (operator && !waitingForOperand) {
            // If there's a pending operation, complete it first
            const result = compute(parseFloat(line2), parseFloat(line1), operator);
            setLine2(result.toString());          // Store result as first operand for next operation
            setLine1(result.toString());          // Display the result
        } else {
            // No pending operation, store current number as first operand
            setLine2(line1);                      // Store current display value
        }
        setOperator(op);                          // Set the selected operator
        setWaitingForOperand(true);               // Flag that we're waiting for the next number
    };

    // Handle equals button press - complete the calculation and save to history
    const handleEqual = () => {
        if (operator) {                           // Only calculate if there's an operation pending
            const result = compute(parseFloat(line2), parseFloat(line1), operator);
            
            // === HISTORY TRACKING ===
            // Create formatted calculation string and add to persistent history
            // Format: "firstNumber operator secondNumber = result" (e.g., "5 + 3 = 8")
            const calculation = `${line2} ${operator} ${line1} = ${result}`;
            addToHistory(calculation); // Save this calculation to history with persistent storage
            
            setLine1(result.toString());          // Display the final result
            setLine2('');                         // Clear the operation display
            setOperator(null);                    // Clear the operator
            setWaitingForOperand(true);           // Ready for next operation
            setCursorPosition(result.toString().length); // Position cursor at end of result
        }
    };

    // === RENDER CALCULATOR UI ===
    return (
        <SafeAreaView style={styles.container}>
            {/* Configure status bar appearance */}
            <StatusBar
                animated={true}                   // Enable animations
                backgroundColor="#000"            // Black background
                barStyle={"light-content"}        // Light text/icons
                showHideTransition={"fade"}       // Fade transition
                hidden={false}                    // Show status bar
            />
            
            {/* Calculator display area */}
            <View style={styles.display}>
                {/* === HISTORY ACCESS BUTTON === */}
                {/* History button - positioned in top right corner of display area */}
                {/* Pressing this button opens the history drawer modal to show calculation history */}
                <Pressable
                    onPress={() => setIsHistoryVisible(true)} // Show history drawer when pressed
                    style={styles.historyButton}              // Positioned absolutely in top-right
                >
                    <Text style={styles.historyButtonText}>📋</Text> {/* Clipboard emoji icon */}
                </Pressable>
                
                {/* Top line: shows previous number and operator */}
                <Text style={styles.dispText1}>
                    {line2 && operator ? `${line2} ${operator}` : ''}
                </Text>
                
                {/* Main display: current number with cursor support */}
                <TextInput
                    style={[styles.dispText, { fontSize: calculateFontSize(line1) }]} // Dynamic font size
                    value={line1}                                    // Current number
                    selection={{ start: cursorPosition, end: cursorPosition }}        // Cursor position
                    onSelectionChange={(event) => setCursorPosition(event.nativeEvent.selection.start)} // Update cursor
                    showSoftInputOnFocus={false}                     // Don't show keyboard
                    multiline={false}                                // Single line only
                    editable={true}                                  // Allow cursor positioning
                />
            </View>

            {/* === CALCULATOR BUTTON ROWS === */}
            
            {/* First row: AC, %, ⌫, ÷ */}
            <View style={styles.keys}>
                {/* All Clear button */}
                <Pressable
                    onPress={clearScreen}         // Reset calculator
                    style={[styles.keyAsh, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText1}>AC</Text>
                </Pressable>
                
                {/* Percentage button */}
                <Pressable
                    onPress={inputPercent}        // Convert to percentage
                    style={[styles.keyAsh, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText1}>%</Text>
                </Pressable>
                
                {/* Delete/Backspace button */}
                <Pressable
                    onPress={deleteLastChar}      // Remove character at cursor
                    style={[styles.keyAsh, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText1}>⌫</Text>
                </Pressable>
                
                {/* Division button */}
                <Pressable
                    onPress={() => handleOperator('÷')} // Set division operator
                    style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>÷</Text>
                </Pressable>
            </View>

            {/* Second row: 7, 8, 9, × */}
            <View style={styles.keys}>
                <Pressable
                    onPress={() => inputNumber('7')} // Input digit 7
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>7</Text>
                </Pressable>
                <Pressable
                    onPress={() => inputNumber('8')} // Input digit 8
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>8</Text>
                </Pressable>
                <Pressable
                    onPress={() => inputNumber('9')} // Input digit 9
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>9</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleOperator('×')} // Set multiplication operator
                    style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>×</Text>
                </Pressable>
            </View>

            {/* Third row: 4, 5, 6, − */}
            <View style={styles.keys}>
                <Pressable
                    onPress={() => inputNumber('4')} // Input digit 4
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>4</Text>
                </Pressable>
                <Pressable
                    onPress={() => inputNumber('5')} // Input digit 5
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>5</Text>
                </Pressable>
                <Pressable
                    onPress={() => inputNumber('6')} // Input digit 6
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>6</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleOperator('−')} // Set subtraction operator
                    style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>−</Text>
                </Pressable>
            </View>

            {/* Fourth row: 1, 2, 3, + */}
            <View style={styles.keys}>
                <Pressable
                    onPress={() => inputNumber('1')} // Input digit 1
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>1</Text>
                </Pressable>
                <Pressable
                    onPress={() => inputNumber('2')} // Input digit 2
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>2</Text>
                </Pressable>
                <Pressable
                    onPress={() => inputNumber('3')} // Input digit 3
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>3</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleOperator('+')} // Set addition operator
                    style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>+</Text>
                </Pressable>
            </View>

            {/* Fifth row: 0 (double width), ., = */}
            <View style={styles.keys}>
                {/* Zero button (spans two columns) */}
                <Pressable
                    onPress={() => inputNumber('0')} // Input digit 0
                    style={[styles.keyGrey1, { height: height, width: zero, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>0</Text>
                </Pressable>
                
                {/* Decimal point button */}
                <Pressable
                    onPress={inputDot}            // Add decimal point
                    style={[styles.keyGrey, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>.</Text>
                </Pressable>
                
                {/* Equals button */}
                <Pressable
                    onPress={handleEqual}         // Calculate final result
                    style={[styles.keyYellow, { height: height, width: height, borderRadius: radius }]}
                >
                    <Text style={styles.padText}>=</Text>
                </Pressable>
            </View>

            {/* === HISTORY DRAWER MODAL === */}
            {/* Modal component that slides up from bottom to show calculation history */}
            {/* Only visible when isHistoryVisible state is true */}
            <Modal
                animationType="slide"                        // Slide up animation from bottom
                transparent={true}                           // Allow background to show through
                visible={isHistoryVisible}                   // Control visibility with state
                onRequestClose={() => setIsHistoryVisible(false)} // Handle Android back button
            >
                {/* Modal background overlay - semi-transparent black */}
                {/* Touching this area will close the drawer */}
                <Pressable 
                    style={styles.modalContainer}
                    onPress={() => setIsHistoryVisible(false)} // Close drawer when background is touched
                >
                    {/* Main history drawer container */}
                    {/* Prevent event bubbling by stopping propagation when drawer itself is touched */}
                    <Pressable 
                        style={styles.historyDrawer}
                        onPress={(e) => e.stopPropagation()}   // Prevent closing when drawer content is touched
                    >
                        
                        {/* === HISTORY HEADER === */}
                        {/* Header section with title and control buttons */}
                        <View style={styles.historyHeader}>
                            <Text style={styles.historyTitle}>Calculation History</Text>
                            
                            {/* Header action buttons - Clear and Close */}
                            <View style={styles.historyHeaderButtons}>
                                {/* Clear history button - removes all saved calculations */}
                                <Pressable onPress={clearHistory} style={styles.clearButton}>
                                    <Text style={styles.clearButtonText}>Clear</Text>
                                </Pressable>
                                
                                {/* Close drawer button - hides the history modal */}
                                <Pressable onPress={() => setIsHistoryVisible(false)} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>✕</Text> {/* X close icon */}
                                </Pressable>
                            </View>
                        </View>
                        
                        {/* === HISTORY CONTENT === */}
                        {/* Conditional rendering: show empty state or history list */}
                        {history.length === 0 ? (
                            <View style={styles.emptyHistory}>
                                <Text style={styles.emptyHistoryText}>No calculations yet</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={history}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.historyItem}>
                                        <Text style={styles.historyItemText}>{item}</Text>
                                    </View>
                                )}
                                style={styles.historyList}
                            />
                        )}
                    </Pressable>
                </Pressable>
            </Modal>
        </SafeAreaView>
    )
}

// === STYLESHEET DEFINITIONS ===
const styles = StyleSheet.create({
    // Main container - fills entire screen with black background
    container: {
        flex: 1,                    // Take up full available space
        backgroundColor: "#000",    // Black background
    },
    
    // Text styling for number buttons (white text)
    padText: {
        color: "#fff",             // White text color
        fontSize: 35               // Large font size for buttons
    },
    
    // Text styling for function buttons (black text)
    padText1: {
        color: "#000",             // Black text color
        fontSize: 35               // Large font size for buttons
    },
    
    // Main display text styling
    dispText: {
        color: "#fff",             // White text color
        fontSize: 60               // Large font (will be dynamically adjusted)
    },
    
    // Secondary display text styling (for operation display)
    dispText1: {
        color: "#fff",             // White text color
        fontSize: 30               // Medium font size
    },
    
    // Display area container
    display: {
        flex: 1,                   // Take remaining space above buttons
        justifyContent: "flex-end", // Align content to bottom
        alignItems: "flex-end",     // Align content to right
        marginBottom: 40,          // Space between display and buttons
        paddingHorizontal: 20      // Horizontal padding
    },
    
    // Button row container
    keys: {
        flexDirection: "row",       // Arrange buttons horizontally
        flexWrap: "wrap",          // Allow wrapping to next line
        paddingHorizontal: 20,     // Horizontal padding
        justifyContent: "space-between", // Even spacing between buttons
        marginBottom: 20           // Space between button rows
    },
    
    // Standard number button styling (dark gray)
    keyGrey: {
        backgroundColor: "#222",    // Dark gray background
        margin: 5,                 // Margin around button
        height: 50,                // Height (overridden by dynamic sizing)
        width: 50,                 // Width (overridden by dynamic sizing)
        justifyContent: "center",   // Center content vertically
        alignItems: "center"       // Center content horizontally
    },
    
    // Zero button styling (double width, left-aligned text)
    keyGrey1: {
        backgroundColor: "#222",    // Dark gray background
        margin: 5,                 // Margin around button
        height: 50,                // Height (overridden by dynamic sizing)
        width: 50,                 // Width (overridden by dynamic sizing)
        justifyContent: "center",   // Center content vertically
        paddingLeft: 30            // Left padding to align "0" properly
    },
    
    // Function button styling (medium gray)
    keyAsh: {
        backgroundColor: "#555",    // Medium gray background
        margin: 5,                 // Margin around button
        height: 50,                // Height (overridden by dynamic sizing)
        width: 50,                 // Width (overridden by dynamic sizing)
        justifyContent: "center",   // Center content vertically
        alignItems: "center"       // Center content horizontally
    },
    
    // Operator button styling (yellow/orange)
    keyYellow: {
        backgroundColor: "#ffc800ff", // Yellow/orange background
        margin: 5,                 // Margin around button
        height: 50,                // Height (overridden by dynamic sizing)
        width: 50,                 // Width (overridden by dynamic sizing)
        justifyContent: "center",   // Center content vertically
        alignItems: "center"       // Center content horizontally
    },

    // === HISTORY UI STYLES ===
    // Styles for the history drawer functionality and related components

    // History access button positioned in top-right of display area
    historyButton: {
        position: 'absolute',      // Absolute positioning within display container
        top: 20,                   // 20px from top of display area
        right: 20,                 // 20px from right edge of display area
        width: 40,                 // Fixed width for circular button
        height: 40,                // Fixed height for circular button
        justifyContent: 'center',  // Center icon vertically
        alignItems: 'center',      // Center icon horizontally
        backgroundColor: '#333',   // Dark gray background
        borderRadius: 20,          // Circular shape (half of width/height)
        zIndex: 1,                 // Ensure button appears above other elements
    },

    // Text styling for history button icon (clipboard emoji)
    historyButtonText: {
        fontSize: 20,              // Medium size for emoji icon
        color: '#fff',             // White color for visibility
    },

    // Modal background overlay - covers entire screen with semi-transparent background
    modalContainer: {
        flex: 1,                   // Fill entire screen
        justifyContent: 'flex-end', // Align drawer to bottom of screen
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    },

    // Main history drawer container that slides up from bottom
    historyDrawer: {
        backgroundColor: '#222',   // Dark gray background matching calculator theme
        borderTopLeftRadius: 20,   // Rounded top-left corner
        borderTopRightRadius: 20,  // Rounded top-right corner
        maxHeight: '80%',          // Maximum 80% of screen height
        minHeight: '50%',          // Minimum 50% of screen height
    },

    // Header section of history drawer containing title and action buttons
    historyHeader: {
        flexDirection: 'row',      // Arrange title and buttons horizontally
        justifyContent: 'space-between', // Push title left, buttons right
        alignItems: 'center',      // Center items vertically
        padding: 20,               // Inner spacing around header content
        borderBottomWidth: 1,      // Thin border line below header
        borderBottomColor: '#333', // Gray border color
    },

    // Title text in history header
    historyTitle: {
        fontSize: 18,              // Medium-large font size
        fontWeight: 'bold',        // Bold text for emphasis
        color: '#fff',             // White text color
    },

    // Container for header action buttons (Clear and Close)
    historyHeaderButtons: {
        flexDirection: 'row',      // Arrange buttons horizontally
        gap: 10,                   // 10px space between buttons
    },

    // Clear history button styling (red background for destructive action)
    clearButton: {
        backgroundColor: '#ff4444', // Red background to indicate destructive action
        paddingHorizontal: 12,     // Horizontal padding inside button
        paddingVertical: 6,        // Vertical padding inside button
        borderRadius: 6,           // Rounded corners
    },

    // Text styling for clear button
    clearButtonText: {
        color: '#fff',             // White text for contrast on red background
        fontSize: 12,              // Small font size
        fontWeight: 'bold',        // Bold text for readability
    },

    // Close button styling (circular close button)
    closeButton: {
        backgroundColor: '#333',   // Dark gray background
        width: 30,                 // Fixed width for circular button
        height: 30,                // Fixed height for circular button
        borderRadius: 15,          // Circular shape (half of width/height)
        justifyContent: 'center',  // Center X icon vertically
        alignItems: 'center',      // Center X icon horizontally
    },

    // Text styling for close button (X icon)
    closeButtonText: {
        color: '#fff',             // White color for visibility
        fontSize: 16,              // Medium font size for X icon
        fontWeight: 'bold',        // Bold for better visibility
    },

    // === HISTORY CONTENT STYLES ===
    // Styles for the content area of history drawer

    // Empty state container - shown when no calculations exist
    emptyHistory: {
        flex: 1,                   // Take up available space in drawer
        justifyContent: 'center',  // Center message vertically
        alignItems: 'center',      // Center message horizontally
        paddingVertical: 40,       // Vertical padding for spacing
    },

    // Text styling for empty state message
    emptyHistoryText: {
        color: '#666',             // Muted gray color for secondary text
        fontSize: 16,              // Medium font size
        fontStyle: 'italic',       // Italic style to indicate placeholder text
    },

    // Container for the scrollable history list
    historyList: {
        flex: 1,                   // Take up available space in drawer
        paddingHorizontal: 20,     // Horizontal padding for list items
    },

    // Individual history item container (each calculation entry)
    historyItem: {
        paddingVertical: 12,       // Vertical padding inside each item
        paddingHorizontal: 16,     // Horizontal padding inside each item
        marginVertical: 2,         // Small vertical margin between items
        backgroundColor: '#333',   // Dark gray background for each item
        borderRadius: 8,           // Rounded corners for modern look
    },

    // Text styling for individual history calculations
    historyItemText: {
        color: '#fff',             // White text for readability
        fontSize: 14,              // Small-medium font size
        fontFamily: 'monospace',   // Monospace font for aligned numbers
    },
})