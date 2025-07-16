import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const BookingHistoryScreen = () => {
  const bookings = [
    { id: '1', service: 'Plumbing', date: '2023-10-01', status: 'Completed' },
    { id: '2', service: 'Electrical Work', date: '2023-10-05', status: 'Pending' },
    { id: '3', service: 'Carpentry', date: '2023-10-10', status: 'Completed' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.service}>{item.service}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.status}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking History</Text>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  bookingItem: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  service: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: '#555',
  },
  status: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default BookingHistoryScreen;