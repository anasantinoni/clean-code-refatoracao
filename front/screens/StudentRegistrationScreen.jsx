import React from "react";
import { View, StyleSheet, Text, Alert, ScrollView } from "react-native";
import Input from "../components/CustomInput";
import Button from "../components/CustomButton";
import { useStudentRegistration } from "../hooks/useStudentRegistration"; 

export default function StudentRegistrationScreen({ navigation }) {
  const { 
    studentData, 
    loading, 
    error, 
    handleChange, 
    handleRegister 
  } = useStudentRegistration(navigation);
  
  React.useEffect(() => {
      if (error) {
          Alert.alert("Erro no Cadastro", error);
      }
  }, [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Aluno</Text> 
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Input
          label="Nome Completo" 
          placeholder="Digite o nome completo" 
          value={studentData.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        <Input
          label="Data de Nascimento" 
          placeholder="Ex: 01/01/2000"
          value={studentData.birthDate}
          onChangeText={(text) => handleChange("birthDate", text)}
        />
        <Input
          label="CPF"
          placeholder="Digite o CPF" 
          value={studentData.cpf}
          onChangeText={(text) => handleChange("cpf", text)}
          keyboardType="numeric"
        />
        <Input
          label="Renach"
          placeholder="Digite o Renach" 
          value={studentData.renach}
          onChangeText={(text) => handleChange("renach", text)}
        />
        <Input
          label="Categoria" 
          placeholder="Ex: A, B, AB"
          value={studentData.category}
          onChangeText={(text) => handleChange("category", text)}
        />
        <Input
          label="Celular" 
          placeholder="Digite o celular" 
          value={studentData.phone}
          onChangeText={(text) => handleChange("phone", text)}
        />
        
        <Text style={styles.sectionTitle}>Informações de Endereço</Text> 
        <Input
          label="Rua" 
          placeholder="Digite a rua" 
          value={studentData.street}
          onChangeText={(text) => handleChange("street", text)}
        />
        <Input
          label="Número"
          placeholder="Digite o número" 
          value={studentData.number}
          onChangeText={(text) => handleChange("number", text)}
        />
        <Input
          label="Bairro" 
          placeholder="Digite o bairro" 
          value={studentData.neighborhood}
          onChangeText={(text) => handleChange("neighborhood", text)}
        />
        <Input
          label="Cidade" 
          placeholder="Digite a cidade" 
          value={studentData.city}
          onChangeText={(text) => handleChange("city", text)}
        />
        <Input
          label="Estado" 
          placeholder="Digite o estado" 
          value={studentData.state}
          onChangeText={(text) => handleChange("state", text)}
        />
        
        <Button
          title="Cadastrar"
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
          style={styles.submitButton}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat",
    color: "#0056B3",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
      fontSize: 18,
      fontFamily: "Montserrat",
      color: "#2C2F33",
      marginTop: 10,
      marginBottom: 5,
  },
  submitButton: {
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
  },
});