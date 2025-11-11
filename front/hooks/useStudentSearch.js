import { useState, useEffect } from "react";
import { useDatabase } from "../database/useDatabase";
import { useNavigation } from "@react-navigation/native";

export const useStudentSearch = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { getAlunos } = useDatabase();
  const navigation = useNavigation();

  // Função isolada para buscar (SRP)
  const searchStudents = async (name) => {
    try {
      const studentsResult = await getAlunos(name || ""); 
      setStudents(studentsResult); 
    } catch (error) {
      console.error("Error searching students:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      searchStudents(searchTerm); 
    });
    return unsubscribe;
  }, [navigation, searchTerm]);

  useEffect(() => {
    searchStudents(searchTerm);
  }, [searchTerm]);


  return {
    students,
    searchTerm,
    setSearchTerm,
  };
};