import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Input from "../components/CustomInput";
import Button from "../components/CustomButton";
import Card from "../components/CustomCard";
import { useNavigation } from "@react-navigation/native";
import { useStudentSearch } from "../hooks/useStudentSearch";

export default function StudentSearchScreen() {
  const navigation = useNavigation();
  
  const { students, searchTerm, setSearchTerm } = useStudentSearch();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Input
          label="Pesquisar nome do aluno"
          placeholder="Ex: João"
          value={searchTerm}
          onChangeText={setSearchTerm} 
        />
        <View style={styles.cardContainer}>
          {students.map((student) => (
            <Card
              key={student.id_aluno}
              title={`Nome: ${student.nome_aluno}`}
              description={`CPF: ${student.cpf_aluno}`}
              onPress={() =>
                navigation.navigate("StudentDetailsScreen", { alunoId: student.id_aluno }) 
              }
            />
          ))}
        </View>
      </ScrollView>
      <Button
        title="Adicionar Aluno"
        icon="add"
        onPress={() => navigation.navigate("StudentRegistrationScreen")} 
        style={styles.addButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  scrollContainer: {
    padding: 20,
  },
  cardContainer: {
    marginTop: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: "90%",
  },
});