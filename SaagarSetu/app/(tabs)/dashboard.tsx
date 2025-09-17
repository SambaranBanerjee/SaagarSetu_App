import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Link } from 'expo-router';

export default function Dashboard() {
  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'Coastal Erosion',
      date: '2024-07-26',
      verified: false,
      severity: 'High'
    },
    {
      id: 2,
      type: 'Pollution',
      date: '2024-07-20',
      verified: true,
      severity: 'Medium'
    }
  ]);

  const toggleVerification = (id: number) => {
    setReports(reports.map(report => 
      report.id === id 
        ? { ...report, verified: !report.verified } 
        : report
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      
      <Text style={styles.sectionTitle}>Report Hazard</Text>
      
      <Text style={styles.subsectionTitle}>Quick Actions</Text>
      
      <Link href="./map.tsx" asChild>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Map</Text>
        </TouchableOpacity>
      </Link>
      
      <Link href="/modal" asChild>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Report Hazard</Text>
        </TouchableOpacity>
      </Link>
      
      <Text style={styles.subsectionTitle}>My Reports</Text>
      
      {reports.map(report => (
        <View key={report.id} style={styles.reportItem}>
          <View style={styles.reportHeader}>
            <Switch
              value={report.verified}
              onValueChange={() => toggleVerification(report.id)}
            />
            <Text style={styles.reportStatus}>
              {report.verified ? 'Verified' : 'Unverified'}
            </Text>
            <Text style={[styles.severity, 
              {color: report.severity === 'High' ? 'red' : report.severity === 'Medium' ? 'orange' : 'green'}]}>
              {report.severity}
            </Text>
          </View>
          
          <Text style={styles.reportType}>{report.type}</Text>
          <Text style={styles.reportDate}>Reported on {report.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reportStatus: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  severity: {
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  reportType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reportDate: {
    fontSize: 14,
    color: '#666',
  },
});