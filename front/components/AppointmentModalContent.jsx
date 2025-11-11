import React from 'react';
import { View, Text, Pressable } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import Input from "./CustomInput";
import Button from "./CustomButton";

export default function AppointmentModalContent({ 
    selectedAppointment, 
    setSelectedAppointment, 
    saveAppointment, 
    closeModal,
    styles
}) {
    // estado picker DENTRO do modal (SRP)
    const [showTimePicker, setShowTimePicker] = React.useState(false); 
    
    //manipulação hora isolada
    const handleTimeChange = (_, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setSelectedAppointment({
                ...selectedAppointment,
                hora_aula: selectedTime.toTimeString().split(" ")[0],
            });
        }
    };
    
    if (!selectedAppointment) return null;

    return (
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
                {selectedAppointment.id_aula ? "Editar Agendamento" : "Adicionar Agendamento"}
            </Text>
            <Pressable
                onPress={() => setShowTimePicker(true)}
                style={styles.timeInput}
            >
                <Text style={styles.timeText}>
                    
                    {selectedAppointment.hora_aula || "Selecionar Hora"}
                </Text>
            </Pressable>
            {showTimePicker && (
                <DateTimePicker
                    value={new Date()} 
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                />
            )}
            
            <Input
                label="ID do Aluno" 
                value={selectedAppointment.id_aluno}
                onChangeText={(text) =>
                    setSelectedAppointment({ ...selectedAppointment, id_aluno: text })
                }
            />
            <View style={styles.modalButtonContainer}>
                <Button title="Salvar" onPress={saveAppointment} style={styles.saveButton} />
                <Button title="Fechar" onPress={closeModal} style={styles.closeButton} /> 
            </View>
        </View>
    );
};