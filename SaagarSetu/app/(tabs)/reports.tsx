import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ReportsScreen() {
  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'Coastal Erosion',
      date: '2024-07-26',
      verified: false,
      severity: 'High',
      description: 'Significant erosion observed near the cliff area',
      location: 'Ocean Drive, Coastal City',
      mediaCount: 3
    },
    {
      id: 2,
      type: 'Pollution',
      date: '2024-07-20',
      verified: true,
      severity: 'Medium',
      description: 'Oil spill detected in the harbor area',
      location: 'Harbor View, Coastal City',
      mediaCount: 2
    },
    {
      id: 3,
      type: 'Flooding',
      date: '2024-07-15',
      verified: true,
      severity: 'Critical',
      description: 'Flash flooding in low-lying coastal areas',
      location: 'Bay Street, Coastal City',
      mediaCount: 4
    },
    {
      id: 4,
      type: 'Wildfire',
      date: '2024-07-10',
      verified: false,
      severity: 'High',
      description: 'Brush fire approaching residential area',
      location: 'Hilltop Road, Coastal City',
      mediaCount: 1
    }
  ]);

  const toggleVerification = (id: number) => {
    setReports(reports.map(report => 
      report.id === id 
        ? { ...report, verified: !report.verified } 
        : report
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Low': return '#4CD964';
      case 'Medium': return '#FFCC00';
      case 'High': return '#FF9500';
      case 'Critical': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const getReportIcon = (type: string) => {
    switch(type) {
      case 'Coastal Erosion': return 'earth';
      case 'Pollution': return 'water';
      case 'Flooding': return 'rainy';
      case 'Wildfire': return 'flame';
      default: return 'warning';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Reports</Text>
        <Text style={styles.subtitle}>Manage and track your submitted hazard reports</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{reports.length}</Text>
          <Text style={styles.statLabel}>Total Reports</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{reports.filter(r => r.verified).length}</Text>
          <Text style={styles.statLabel}>Verified</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{reports.filter(r => !r.verified).length}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      <Link href="/(tabs)/report" asChild>
        <TouchableOpacity style={styles.newReportButton}>
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.newReportButtonText}>New Hazard Report</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.sectionTitle}>Recent Reports</Text>
      
      {reports.map(report => (
        <View key={report.id} style={styles.reportItem}>
          <View style={styles.reportHeader}>
            <View style={styles.reportTypeContainer}>
              <Ionicons 
                name={getReportIcon(report.type) as any} 
                size={20} 
                color="#007AFF" 
                style={styles.reportIcon}
              />
              <Text style={styles.reportType}>{report.type}</Text>
            </View>
            
            <View style={styles.reportStatusContainer}>
              <Switch
                value={report.verified}
                onValueChange={() => toggleVerification(report.id)}
              />
              <Text style={styles.reportStatus}>
                {report.verified ? 'Verified' : 'Unverified'}
              </Text>
              <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(report.severity) }]}>
                <Text style={styles.severityText}>{report.severity}</Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.reportDescription}>{report.description}</Text>
          
          <View style={styles.reportDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar" size={14} color="#666" />
              <Text style={styles.detailText}>Reported on {report.date}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="location" size={14} color="#666" />
              <Text style={styles.detailText}>{report.location}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="images" size={14} color="#666" />
              <Text style={styles.detailText}>{report.mediaCount} media files</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  newReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  newReportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  reportItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reportTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reportIcon: {
    marginRight: 8,
  },
  reportType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  reportStatusContainer: {
    alignItems: 'flex-end',
  },
  reportStatus: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginRight: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
  },
  severityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  reportDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  reportDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
});