import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkerDashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Worker Dashboard</Text>
      <Text style={styles.subtitle}>Welcome to your dashboard!</Text>
      {/* Additional components and functionality can be added here */}
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default WorkerDashboardScreen;