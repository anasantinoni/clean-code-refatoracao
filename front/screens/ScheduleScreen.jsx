import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import Button from "../components/CustomButton"; 
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAgendaManagement } from "../hooks/useAgendaManagement";
import AppointmentModalContent from "../components/AppointmentModalContent";

export default function ScheduleScreen() {
  
  const {
    selectedDate,
    appointments,
    selectedAppointment,
    isModalVisible,
    showDatePicker,
    openModal,
    closeModal,
    setShowDatePicker,
    handleDateChange,
    saveAppointment, 
    setSelectedAppointment, 
  } = useAgendaManagement();

  const AppointmentCard = ({ appointment }) => {
      const isPractical = appointment.tipo_aula === 1;
      const cardStyle = isPractical ? styles.praticaCard : styles.teoricaCard;
      const typeText = isPractical ? "Prática" : "Teórica";
      
      return (
        <Pressable
          style={[styles.aulaCard, cardStyle]}
          onPress={() => openModal(appointment)}
        >
          <Text style={styles.aulaInfo}>
            {appointment.hora_aula} - Student: {appointment.id_aluno || "N/A"}
          </Text>
          <Text style={styles.aulaSubText}>
            Type: {typeText}
          </Text>
        </Pressable>
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda</Text> 
      
      <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
        <Text style={styles.dateText}>
          {selectedDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Text>
      </Pressable>
      
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange} 
        />
      )}

      <ScrollView style={styles.scrollContainer}>
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id_aula} appointment={appointment} />
        ))}
      </ScrollView>

      {selectedAppointment && (
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <AppointmentModalContent 
              selectedAppointment={selectedAppointment}
              setSelectedAppointment={setSelectedAppointment}
              saveAppointment={saveAppointment}
              closeModal={closeModal}
              styles={styles} 
            />
          </View>
        </Modal>
      )}

      <Button
        title="Adicionar Agendamento"
        icon="add"
        onPress={() => openModal()}
        style={styles.addButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0056B3",
    marginBottom: 10,
    fontFamily: "Montserrat",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#2C2F33",
  },
  scrollContainer: {
    flex: 1,
  },
  aulaCard: {
    padding: 10,
    borderRadius: 4,
    marginTop: 5,
    borderLeftWidth: 5,
  },
  praticaCard: {
    backgroundColor: "#E8F5E9",
    borderLeftColor: "#4CAF50",
  },
  teoricaCard: {
    backgroundColor: "#FFEBEE",
    borderLeftColor: "#F44336",
  },
  aulaInfo: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#2C2F33",
  },
  aulaSubText: {
    fontSize: 12,
    fontFamily: "Poppins",
    color: "#555",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Montserrat",
    color: "#0056B3",
    marginBottom: 15,
    textAlign: "center",
  },
  timeInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  timeText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#2C2F33",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    width: "45%",
  },
  closeButton: {
    backgroundColor: "#D32F2F",
    width: "45%",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    alignSelf: "center",
    width: "90%",
  },
});