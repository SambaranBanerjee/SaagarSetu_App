import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import LanguageSelector from './LanguageSelector';

// For testing, you can use a local image or remove the background
const BACKGROUND_IMAGE = { uri: 'https://placehold.co/600x400/ocean/white?text=Coastal+Background' };

export default function Onboarding() {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={BACKGROUND_IMAGE} style={styles.background} />
      <View style={styles.overlay}>
        <Text style={styles.title}>Coastal Watch</Text>
        <Text style={styles.subtitle}>
          Report and track environmental hazards in your community.
        </Text>
        
        {!showLanguageSelector ? (
          <>
            <Link href="../app/(tabs)/dashboard.tsx" asChild>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
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