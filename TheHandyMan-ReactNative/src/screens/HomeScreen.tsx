import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, SPACING } from '../styles';
import { Card, Button } from '../components/common';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const serviceCategories = [
    { id: '1', name: 'Plumbing', icon: 'droplet', color: colors.primary },
    { id: '2', name: 'Electrical', icon: 'zap', color: colors.accent },
    { id: '3', name: 'Carpentry', icon: 'tool', color: colors.secondary },
    { id: '4', name: 'Gardening', icon: 'scissors', color: '#28a745' },
    { id: '5', name: 'Cleaning', icon: 'home', color: '#6f42c1' },
    { id: '6', name: 'Painting', icon: 'edit-3', color: '#fd7e14' },
  ];

  const featuredServices = [
    {
      id: '1',
      title: 'Emergency Plumbing',
      provider: 'John Smith',
      rating: 4.8,
      price: 75,
      image: 'wrench',
    },
    {
      id: '2',
      title: 'Garden Maintenance',
      provider: 'Mary Johnson',
      rating: 4.9,
      price: 50,
      image: 'scissors',
    },
  ];

  const renderServiceCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate('ServiceCategory', { category: item })}
    >
      <View style={[styles.categoryIcon, { backgroundColor: `${item.color}20` }]}>
        <Feather name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFeaturedService = ({ item }) => (
    <Card style={styles.featuredCard}>
      <View style={styles.serviceHeader}>
        <View style={styles.serviceIcon}>
          <Feather name={item.image} size={20} color={colors.primary} />
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTitle}>{item.title}</Text>
          <Text style={styles.serviceProvider}>by {item.provider}</Text>
        </View>
        <View style={styles.serviceRating}>
          <Feather name="star" size={14} color="#ffc107" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.serviceFooter}>
        <Text style={styles.servicePrice}>${item.price}/hour</Text>
        <Button
          title="Book Now"
          onPress={() => navigation.navigate('BookService', { service: item })}
          size="small"
          style={styles.bookButton}
        />
      </View>
    </Card>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.subtitle}>How can we help you today?</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Feather name="user" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={colors.placeholder} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for services or providers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.placeholder}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="sliders" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Service Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Categories</Text>
        <FlatList
          data={serviceCategories}
          renderItem={renderServiceCategory}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.categoriesGrid}
        />
      </View>

      {/* Featured Services */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={featuredServices}
          renderItem={renderFeaturedService}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <Button
            title="Book Emergency Service"
            onPress={() => navigation.navigate('EmergencyBooking')}
            variant="outline"
            style={styles.quickActionButton}
            icon={<Feather name="alert-circle" size={16} color={colors.danger} />}
          />
          <Button
            title="View My Bookings"
            onPress={() => navigation.navigate('BookingHistory')}
            variant="secondary"
            style={styles.quickActionButton}
            icon={<Feather name="calendar" size={16} color={colors.background} />}
          />
        </View>
      </View>

      {/* Bottom Navigation Placeholder */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.background,
  },
  subtitle: {
    fontSize: 16,
    color: `${colors.background}80`,
    marginTop: 4,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  filterButton: {
    padding: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  categoriesGrid: {
    paddingTop: 16,
  },
  categoryCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 16,
    maxWidth: (width - 80) / 3,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  featuredList: {
    paddingRight: 20,
  },
  featuredCard: {
    width: 280,
    marginRight: 16,
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}10`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  serviceProvider: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  serviceRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 4,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  bookButton: {
    backgroundColor: colors.accent,
  },
  quickActions: {
    gap: 12,
    marginTop: 16,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default HomeScreen;