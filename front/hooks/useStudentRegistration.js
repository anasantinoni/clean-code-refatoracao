import { useState } from "react";
import { useDatabase } from "../database/useDatabase";

export const useStudentRegistration = (navigation) => {
  const [studentData, setStudentData] = useState({
    name: "",
    birthDate: "",
    cpf: "",
    renach: "",
    category: "",
    phone: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addAluno } = useDatabase();

  const handleChange = (field, value) => {
    setStudentData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const validateForm = () => {
    const { name, cpf, birthDate } = studentData;

    if (!name || !cpf || !birthDate) {
      setError("Please fill in all mandatory fields: Name, CPF, and Birth Date.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    const payload = {
      nome_aluno: studentData.name,
      email_aluno: `${studentData.cpf}@email.com`, 
      data_nascimento: studentData.birthDate,
      cpf_aluno: studentData.cpf,
      renach_aluno: studentData.renach,
      celular_aluno: studentData.phone,
      rua_aluno: studentData.street,
      numero_residencial_aluno: studentData.number,
      bairro_aluno: studentData.neighborhood,
      cidade_aluno: studentData.city,
      estado_aluno: studentData.state,
    };

    try {
      await addAluno(payload);
      navigation.goBack();
    } catch (err) {
      console.error("Error registering student:", err);
      setError("An error occurred during registration. Check the console.");
    } finally {
      setLoading(false);
    }
  };

  return {
    studentData,
    loading,
    error,
    handleChange,
    handleRegister,
  };
};