import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { View, Text, StyleSheet } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#ffffffff',
        tabBarStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // translucent grey
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 25,
          paddingTop: 12,
          shadowColor: '#000000ff',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 6,
        },
        headerStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // translucent grey
          shadowColor: '#000000ff',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        },
        headerTintColor: Colors[colorScheme ?? 'light'].headerText,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <Ionicons 
              name={focused ? 'add-circle' : 'add-circle-outline'} 
              color={focused ? Colors[colorScheme ?? 'light'].tint : '#64748B'} 
              size={22} 
            />
          ),
          tabBarLabel: 'Report',
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <Ionicons 
              name={focused ? 'map' : 'map-outline'} 
              color={focused ? Colors[colorScheme ?? 'light'].tint : '#64748B'} 
              size={22} 
            />
          ),
          tabBarLabel: 'Map',
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'My Reports',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <Ionicons 
              name={focused ? 'document-text' : 'document-text-outline'} 
              color={focused ? Colors[colorScheme ?? 'light'].tint : '#64748B'} 
              size={22} 
            />
          ),
          tabBarLabel: 'Reports',
        }}
      />
    </Tabs>
  );
}