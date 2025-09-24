import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ReportScreen() {
  const reportOptions = [
    {
      id: 1,
      title: 'Text Report',
      icon: 'document-text',
      description: 'Submit a detailed text description of the hazard',
      color: '#007AFF',
      route: '/modal'
    },
    {
      id: 2,
      title: 'Photo Report',
      icon: 'camera',
      description: 'Upload photos of the environmental hazard',
      color: '#34C759',
      route: '/modal'
    },
    {
      id: 3,
      title: 'Video Report',
      icon: 'videocam',
      description: 'Record or upload video evidence',
      color: '#FF9500',
      route: '/modal'
    },
    {
      id: 4,
      title: 'Audio Report',
      icon: 'mic',
      description: 'Record an audio description',
      color: '#AF52DE',
      route: '/modal'
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Report Hazard</Text>
      <Text style={styles.subtitle}>Choose how you want to report the environmental hazard</Text>
      
      <View style={styles.optionsGrid}>
        {reportOptions.map((option) => (
          <Link key={option.id} href={option.route as any} asChild>
            <TouchableOpacity style={styles.optionCard}>
              <View style={[styles.iconContainer, { backgroundColor: `${option.color}20` }]}>
                <Ionicons name={option.icon as any} size={32} color={option.color} />
              </View>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
      
      <View style={styles.quickTips}>
        <Text style={styles.tipsTitle}>Quick Tips</Text>
        <View style={styles.tipItem}>
          <Ionicons name="information-circle" size={20} color="#007AFF" />
          <Text style={styles.tipText}>Include clear location details</Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="information-circle" size={20} color="#007AFF" />
          <Text style={styles.tipText}>Describe the severity accurately</Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="information-circle" size={20} color="#007AFF" />
          <Text style={styles.tipText}>Take multiple photos from different angles</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  optionCard: {
    width: '48%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  optionDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  quickTips: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1a1a1a',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
});