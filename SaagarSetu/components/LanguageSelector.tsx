import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface LanguageSelectorProps {
  onClose: () => void;
}

export default function LanguageSelector({ onClose }: LanguageSelectorProps) {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hn', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Language</Text>
      
      {languages.map(lang => (
        <TouchableOpacity 
          key={lang.code}
          style={styles.languageOption}
          onPress={() => {
            // Here you would set the app language
            onClose();
          }}
        >
          <Text style={styles.languageText}>{lang.name}</Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  languageOption: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  languageText: {
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 20,
    padding: 10,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
});