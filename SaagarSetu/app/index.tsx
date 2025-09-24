import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import LanguageSelector from '../components/LanguageSelector';

export default function OnboardingScreen() {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  return (
    <ImageBackground 
      source={require('../assets/coastal-bg.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Coastal Watch</Text>
        <Text style={styles.subtitle}>
          Report and track environmental hazards in your community.
        </Text>
        
        {!showLanguageSelector ? (
          <>
            <Link href="./(tabs)/report" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </Link>
            
            <TouchableOpacity 
              style={styles.languageButton}
              onPress={() => setShowLanguageSelector(true)}
            >
              <Text style={styles.languageButtonText}>Select Language</Text>
            </TouchableOpacity>
          </>
        ) : (
          <LanguageSelector onClose={() => setShowLanguageSelector(false)} />
        )}
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  languageButton: {
    padding: 15,
  },
  languageButtonText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});