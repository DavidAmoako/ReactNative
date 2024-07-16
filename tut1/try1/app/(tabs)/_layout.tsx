import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Feather } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
                color: '#fff',
            },
            headerTitleAlign: 'center',
        }}>
            <Tabs.Screen name="(home)" options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Feather name="home" color={color} size={size} />
                ),
            }} />
            <Tabs.Screen name="settings" options={{
                title: "Settings",
                tabBarIcon: ({ color, size }) => (
                    <Feather name="settings" color={color} size={size} />
                ),
            }} />
        </Tabs>
    );
}
