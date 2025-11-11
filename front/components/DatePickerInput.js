import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePickerInput({ label, value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (_, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
        <Text style={{ color: value ? '#2C2F33' : '#A8C8E0', fontFamily: 'Poppins' }}>
          {value ? value.toLocaleDateString() : 'Select Date'}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
    justifyContent: 'center',
  },
});