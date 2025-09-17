import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapScreen() {
  const [filters, setFilters] = useState({
    CoastalErosion: true,
    Pollution: true,
    Flooding: true,
    Wildfire: true,
    Other: true,
  });

  const [hazards] = useState([
    {
      id: 1,
      type: 'Coastal Erosion',
      latitude: 26.5215,
      longitude: 88.7196,
      severity: 'High',
      verified: true,
    },
    {
      id: 2,
      type: 'Pollution',
      latitude: 26.8649,
      longitude: 88.7422,
      severity: 'Medium',
      verified: false,
    },
  ]);

  const toggleFilter = (filter: string) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter as keyof typeof filters],
    });
  };

  const getMarkerColor = (severity: string) => {
    switch(severity) {
      case 'Low': return 'green';
      case 'Medium': return 'orange';
      case 'High': return 'red';
      case 'Critical': return 'purple';
      default: return 'gray';
    }
  };

  const filteredHazards = hazards.filter(hazard => filters[hazard.type as keyof typeof filters]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {filteredHazards.map(hazard => (
          <Marker
            key={hazard.id}
            coordinate={{
              latitude: hazard.latitude,
              longitude: hazard.longitude,
            }}
            pinColor={getMarkerColor(hazard.severity)}
            title={hazard.type}
            description={`Severity: ${hazard.severity}`}
          />
        ))}
      </MapView>
      
      <View style={styles.filterPanel}>
        <Text style={styles.filterTitle}>Filters</Text>
        {Object.keys(filters).map(filter => (
          <TouchableOpacity 
            key={filter}
            style={[styles.filterButton, filters[filter as keyof typeof filters] && styles.activeFilter]}
            onPress={() => toggleFilter(filter)}
          >
            <Text style={[styles.filterText, filters[filter as keyof typeof filters] && styles.activeFilterText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  filterPanel: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  filterTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterButton: {
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    textAlign: 'center',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: 'bold',
  },
});