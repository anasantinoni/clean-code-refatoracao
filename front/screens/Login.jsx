// Arquivo: front/screens/Login.jsx (UI em Português)

import { useEffect } from "react"
import { View, StyleSheet, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { verifyAuth } from "../actions/auth";
import { useNavigation } from "@react-navigation/native";
import { useAuthManagement } from "../hooks/useAuthManagement";

export default function Login() {
  const navigation = useNavigation();
  
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    loading, 
    error, 
    handleLogin 
  } = useAuthManagement(navigation); 

  useEffect(() => {
    const isAuth = verifyAuth();
    if (isAuth) {
      navigation.navigate("Home");
    }
  }, []);
  
  useEffect(() => {
    if (error) {
      Alert.alert("Erro de Login", error); 
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
        onPress={handleLogin}
        loading={loading}
        mode="contained-tonal"
        buttonColor="#0056B3"
        textColor="#FFFFFF"
        disabled={loading}
      >
        Login
      </Button>
      <Text style={{ marginTop: 15 }}>
        Não tem uma conta?{" "} 
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          Registre-se 
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