import { useState, useEffect } from "react";
import { useDatabase } from "../database/useDatabase";

export const useAgendaManagement = () => {
  const { getAulas, addAula, updateAula } = useDatabase();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]); 
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const loadAppointments = async () => {
    try {
      const dateString = selectedDate.toISOString().split("T")[0];
      const response = await getAulas(dateString);
      setAppointments(response);
    } catch (error) {
      console.error("Error loading appointments:", error);
    }
  };

  const saveAppointment = async () => {
    try {
      if (!selectedAppointment.id_aluno || !selectedAppointment.hora_aula) {
        alert("Aluno e horário são obrigatórios.");
        return; 
      }

      if (selectedAppointment.id_aula) {
        await updateAula(selectedAppointment);
      } else {
        await addAula(selectedAppointment);
      }
      loadAppointments(); 
      closeModal();
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Erro ao salvar agendamento.");
    }
  };

  const openModal = (appointment = null) => {
    setSelectedAppointment(
      appointment || {
        id_aula: null,
        id_aluno: "",
        id_usuario: "",
        data_aula: selectedDate.toISOString().split("T")[0],
        hora_aula: "",
        type: "1", 
        status: "1", 
        cancellationReason: "", 
        carPlate: "", 
      }
    );
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedAppointment(null);
  };
  
  const handleDateChange = (_, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date); 
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [selectedDate]);

  return {
    selectedDate,
    appointments,
    selectedAppointment,
    isModalVisible,
    showDatePicker,
    setSelectedDate,
    openModal,
    closeModal,
    saveAppointment,
    setSelectedAppointment,
    setShowDatePicker,
    handleDateChange,
  };
};