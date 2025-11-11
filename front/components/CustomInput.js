import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

// Adicionei prop 'editable' para consistência
export default function CustomInput({ label, value, onChangeText, placeholder, keyboardType, style, editable = true }) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, !editable && styles.uneditableInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A8C8E0"
        keyboardType={keyboardType || 'default'}
        editable={editable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#2C2F33',
    fontFamily: 'Montserrat',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F4F4F4',
    borderWidth: 1,
    borderColor: '#A8C8E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#2C2F33',
  },
  uneditableInput: {
      backgroundColor: '#E0E0E0',
      color: '#555',
  }
});