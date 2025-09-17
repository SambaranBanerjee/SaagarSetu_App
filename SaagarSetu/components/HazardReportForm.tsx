import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function HazardReportForm() {
  const router = useRouter();
  const [hazardType, setHazardType] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState<string[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const hazardTypes = [
    'Coastal Erosion',
    'Pollution',
    'Flooding',
    'Wildfire',
    'Other'
  ];

  const severityLevels = [
    'Low',
    'Medium',
    'High',
    'Critical'
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia([...media, result.assets[0].uri]);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Report a Hazard</Text>
      
      <View style={styles.reportOptions}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Photo/Video</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Voice Report</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Text Report</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.sectionTitle}>Upload Media</Text>
      
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>Add Photo/Video</Text>
      </TouchableOpacity>
      
      <Text style={styles.sectionTitle}>Hazard Type</Text>
      
      <View style={styles.optionsContainer}>
        {hazardTypes.map(type => (
          <TouchableOpacity 
            key={type}
            style={[styles.option, hazardType === type && styles.selectedOption]}
            onPress={() => setHazardType(type)}
          >
            <Text style={hazardType === type ? styles.selectedOptionText : styles.optionText}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Severity Level</Text>
      
      <View style={styles.optionsContainer}>
        {severityLevels.map(level => (
          <TouchableOpacity 
            key={level}
            style={[styles.option, severity === level && styles.selectedOption]}
            onPress={() => setSeverity(level)}
          >
            <Text style={severity === level ? styles.selectedOptionText : styles.optionText}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Description</Text>
      
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={4}
        placeholder="Describe the hazard in detail..."
        value={description}
        onChangeText={setDescription}
      />
      
      <Text style={styles.sectionTitle}>Location</Text>
      
      <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
        <Text style={styles.locationButtonText}>Auto-tag Location</Text>
      </TouchableOpacity>
      
      {location && (
        <Text style={styles.locationText}>
          123 Ocean Drive, Coastal City
        </Text>
      )}
      
      <TouchableOpacity style={styles.submitButton} onPress={() => router.back()}>
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>
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
  reportOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  option: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  selectedOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  locationButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  locationButtonText: {
    fontSize: 16,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});