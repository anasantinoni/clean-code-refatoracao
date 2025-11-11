import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

// propriedade 'disabled' e 'loading' para evitar múltiplos cliques
export default function CustomButton({ title, onPress, icon, style, disabled = false, loading = false }) {
  
  const buttonStyle = [
    styles.button, 
    style, 
    (disabled || loading) && styles.disabledButton 
  ];
  
  // SRP - Função handlePress isola a lógica de quando ignorar o clique
  const handlePress = loading || disabled ? () => {} : onPress;

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={handlePress}
      activeOpacity={0.7} 
      disabled={disabled || loading}
    >
      {icon && !loading && <Icon name={icon} size={20} color="#FFFFFF" style={styles.icon} />}
      
      {loading ? (
          <Text style={styles.text}>Loading...</Text>
      ) : (
          <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0056B3",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
    width: "80%",
    marginBottom: 20,
  },
  disabledButton: { 
    opacity: 0.6,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Montserrat",
  },
  icon: {
    marginRight: 10,
  },
});