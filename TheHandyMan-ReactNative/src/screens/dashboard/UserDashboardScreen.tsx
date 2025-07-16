import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserDashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Dashboard</Text>
      <Text>Welcome to your dashboard!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default UserDashboardScreen;