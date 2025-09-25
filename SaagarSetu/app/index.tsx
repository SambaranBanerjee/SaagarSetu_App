import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Modal } from 'react-native';
import { Link } from 'expo-router';
import LanguageSelector from '../components/LanguageSelector';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function OnboardingScreen() {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  // Mock data
  const weatherData = {
    current: {
      temp: 28,
      condition: 'Partly Cloudy',
      icon: 'partly-sunny',
      high: 30,
      low: 24,
    },
    forecast: [
      { day: 'Tomorrow', temp: 29, icon: 'sunny' },
      { day: 'Wed', temp: 27, icon: 'cloudy' },
    ],
  };

  const safetyData = {
    level: 'moderate',
    description: 'Moderate Rip Current Risk',
    swimStatus: 'caution',
    boatStatus: 'safe',
  };

  const tideData = {
    high: '06:30 AM',
    low: '01:15 PM',
    next: '07:45 PM',
  };

  const seaStateData = {
    condition: 'Calm',
    waveHeight: '0.5m',
    recommendation: 'Good for fishing',
  };

  type SafetyLevel = 'safe' | 'caution' | 'danger';

  const getSafetyColor = (level: SafetyLevel): string => {
    const colors = {
      safe: '#4CAF50',
      caution: '#FF9800',
      danger: '#F44336'
    };
    return colors[level];
  };

  const getStatusIcon = (level: SafetyLevel): string => {
    const icons = {
      safe: 'checkmark',
      caution: 'remove',
      danger: 'close'
    };
    return icons[level];
  };

  return (
    <ImageBackground 
      source={require('../assets/coastal-bg.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header with Centered Title */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.languageIcon}
            onPress={() => setShowLanguageSelector(true)}
          >
            <Ionicons name="language" size={22} color="white" />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            {/* <Ionicons name="boat" size={20} color="#007AFF" /> */}
            <Text style={styles.title}>Sagar Setu</Text>
          </View>
          
          <View style={styles.placeholder} />
        </View>

        <Text style={styles.subtitle}>
          Your coastal companion for safety and insights
        </Text>

        {/* Main Report Button */}
        <Link href="./(tabs)/report" asChild>
          <TouchableOpacity style={styles.mainButton}>
            <Ionicons name="megaphone" size={20} color="white" />
            <Text style={styles.mainButtonText}>Report Setu</Text>
          </TouchableOpacity>
        </Link>

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Compact Weather Card */}
          <View style={styles.weatherCard}>
            <View style={styles.weatherMain}>
              <Ionicons name={weatherData.current.icon as any} size={36} color="#FFA000" />
              <View style={styles.weatherInfo}>
                <Text style={styles.currentTemp}>{weatherData.current.temp}°</Text>
                <Text style={styles.weatherCondition}>{weatherData.current.condition}</Text>
              </View>
              <View style={styles.weatherHighLow}>
                <Text style={styles.highLowText}>H: {weatherData.current.high}°</Text>
                <Text style={styles.highLowText}>L: {weatherData.current.low}°</Text>
              </View>
            </View>

            <View style={styles.weatherFooter}>
              <View style={styles.tideInfo}>
                <MaterialCommunityIcons name="waves" size={16} color="#007AFF" />
                <Text style={styles.tideText}>Tide: {tideData.high} | {tideData.low}</Text>
              </View>
              <View style={styles.forecastMini}>
                {weatherData.forecast.map((day, index) => (
                  <View key={index} style={styles.forecastItem}>
                    <Text style={styles.forecastDay}>{day.day}</Text>
                    <Ionicons name={day.icon as any} size={14} color="#666" />
                    <Text style={styles.forecastTemp}>{day.temp}°</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Compact Safety Card */}
          <View style={styles.safetyCard}>
            <View style={styles.safetyHeader}>
              <MaterialCommunityIcons name="beach" size={18} color="#007AFF" />
              <Text style={styles.safetyTitle}>Safety Status</Text>
              <View style={[styles.statusIndicator, { backgroundColor: getSafetyColor(safetyData.level as SafetyLevel) }]}>
                <Text style={styles.statusText}>{safetyData.level.toUpperCase()}</Text>
              </View>
            </View>
            
            <Text style={styles.safetyDescription}>{safetyData.description}</Text>
            
            <View style={styles.safetyIcons}>
              <View style={styles.safetyItem}>
                <View style={styles.iconWrapper}>
                  <View style={[styles.circleIcon, { borderColor: getSafetyColor(safetyData.swimStatus as SafetyLevel) }]}>
                    <MaterialCommunityIcons 
                      name="swim" 
                      size={20} 
                      color={getSafetyColor(safetyData.swimStatus as SafetyLevel)} 
                    />
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getSafetyColor(safetyData.swimStatus as SafetyLevel) }]}>
                    <Ionicons 
                      name={getStatusIcon(safetyData.swimStatus as SafetyLevel) as any} 
                      size={10} 
                      color="white" 
                    />
                  </View>
                </View>
                <Text style={styles.safetyLabel}>Swim</Text>
              </View>
              
              <View style={styles.safetyItem}>
                <View style={styles.iconWrapper}>
                  <View style={[styles.circleIcon, { borderColor: getSafetyColor(safetyData.boatStatus as SafetyLevel) }]}>
                    <MaterialCommunityIcons 
                      name="sail-boat" 
                      size={20} 
                      color={getSafetyColor(safetyData.boatStatus as SafetyLevel)} 
                    />
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getSafetyColor(safetyData.boatStatus as SafetyLevel) }]}>
                    <Ionicons 
                      name={getStatusIcon(safetyData.boatStatus as SafetyLevel) as any} 
                      size={10} 
                      color="white" 
                    />
                  </View>
                </View>
                <Text style={styles.safetyLabel}>Boat</Text>
              </View>
            </View>
          </View>

          {/* Compact Sea State Card */}
          <View style={styles.seaStateCard}>
            <View style={styles.seaStateHeader}>
              <FontAwesome5 name="fish" size={18} color="#007AFF" />
              <Text style={styles.seaStateTitle}>Sea Conditions</Text>
            </View>
            <View style={styles.seaStateContent}>
              <View style={styles.waveInfo}>
                <MaterialCommunityIcons name="wave" size={24} color="#2196F3" />
                <View>
                  <Text style={styles.waveHeight}>{seaStateData.waveHeight}</Text>
                  <Text style={styles.seaCondition}>{seaStateData.condition}</Text>
                </View>
              </View>
              <View style={styles.recommendation}>
                <Ionicons name="thumbs-up" size={14} color="#4CAF50" />
                <Text style={styles.recommendationText}>{seaStateData.recommendation}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Language Selector Modal */}
        <Modal
          visible={showLanguageSelector}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowLanguageSelector(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowLanguageSelector(false)}
          >
            <View style={styles.languagePopup}>
              <LanguageSelector onClose={() => setShowLanguageSelector(false)} />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 6,
  },
  languageIcon: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 36,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  // Main Button
  mainButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  mainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  // Weather Card
  weatherCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  weatherMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weatherInfo: {
    alignItems: 'center',
    flex: 1,
  },
  currentTemp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  weatherCondition: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  weatherHighLow: {
    alignItems: 'flex-end',
  },
  highLowText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  weatherFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  tideInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tideText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  forecastMini: {
    flexDirection: 'row',
    gap: 12,
  },
  forecastItem: {
    alignItems: 'center',
  },
  forecastDay: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  forecastTemp: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },
  // Safety Card
  safetyCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  safetyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 6,
    flex: 1,
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  safetyDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  safetyIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  safetyItem: {
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 4,
  },
  circleIcon: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  statusBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  safetyLabel: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500',
  },
  // Sea State Card
  seaStateCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  seaStateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  seaStateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 6,
  },
  seaStateContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waveInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waveHeight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  seaCondition: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9f0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  recommendationText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 4,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 20,
  },
  languagePopup: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    minWidth: 120,
  },
});