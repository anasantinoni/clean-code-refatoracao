import { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAuthManagement } from "../hooks/useAuthManagement";

export default function RegisterScreen() {
  const navigation = useNavigation();
  
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    loading, 
    error, 
    handleRegister 
  } = useAuthManagement(navigation);
  
  useEffect(() => {
    if (error) {
      Alert.alert("Erro de Registro", error);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        value={email}
        label="Email"
        mode="outlined"
        style={styles.input}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        label="Senha" 
        mode="outlined"
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        onPress={handleRegister}
        loading={loading}
        mode="contained-tonal"
        buttonColor="#0056B3"
        textColor="#FFFFFF"
        disabled={loading}
      >
        Register
      </Button>
      <Text style={{ marginTop: 15 }}>
        Already have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    marginBottom: 16,
  },
  link: {
    color: 'blue',
  },
});