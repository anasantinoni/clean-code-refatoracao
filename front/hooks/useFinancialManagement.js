import { useState, useEffect } from 'react';
import { useDatabase } from '../database/useDatabase'; 

export const useFinancialManagement = (studentId) => {
  const { 
    getStudentById,
    getFinanceiros, 
    addFinanceiro, 
    updateFinanceiro, 
    deleteFinanceiro 
  } = useDatabase();
  
  const [student, setStudent] = useState(null);
  const [installments, setInstallments] = useState([]);
  const [selectedInstallment, setSelectedInstallment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadInstallments = async () => {
    if (!studentId) return;

    try {
      const response = await getFinanceiros(studentId);
      setInstallments(response);
    } catch (error) {
      console.error("Error loading installments:", error);
    }
  };
  
  const loadStudentDetails = async () => {
      if (!studentId) return;
      try {
          const studentData = await getStudentById(studentId); 
          setStudent(studentData);
      } catch (error) {
          console.error("Error loading student details:", error);
      }
  }

  const saveInstallment = async () => {
    try {
      if (!selectedInstallment) return; 
      
      // garantir que valor é numérico)
      if (typeof selectedInstallment.valor !== 'number' || selectedInstallment.valor <= 0) {
        alert("O valor da parcela deve ser um número positivo.");
        return;
      }
      
      if (selectedInstallment.id_parcela) {
        await updateFinanceiro(selectedInstallment);
      } else {
        await addFinanceiro(selectedInstallment);
      }
      loadInstallments(); 
      closeModal();
    } catch (error) {
      console.error("Error saving installment:", error);
      alert("Erro ao salvar parcela."); // Feedback usuário
    }
  };

  const removeInstallment = async (installmentId) => {
    try {
      await deleteFinanceiro(installmentId);
      loadInstallments();
    } catch (error) {
      console.error("Error removing installment:", error);
      alert("Erro ao remover parcela.");
    }
  };
  
  const openModal = (installment = null) => {
    setSelectedInstallment(
      installment || { 
        valor: 0, 
        data_vencimento: "", 
        id_aluno: studentId 
      }
    );
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedInstallment(null);
  };
  
  useEffect(() => {
    loadStudentDetails();
    loadInstallments();
  }, [studentId]); 

  return {
    student,
    installments,
    selectedInstallment,
    isModalVisible,
    openModal,
    closeModal,
    saveInstallment,
    removeInstallment,
    setSelectedInstallment,
  };
};