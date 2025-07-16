import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const MessagesScreen = () => {
  const messages = [
    { id: '1', text: 'Hello, how can I help you?' },
    { id: '2', text: 'I would like to book a service.' },
    { id: '3', text: 'Sure! What service do you need?' },
    // Add more messages as needed
  ];

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4ff',
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
  },
});

export default MessagesScreen;