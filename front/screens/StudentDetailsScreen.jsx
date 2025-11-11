import React from "react";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import Input from "../components/CustomInput";
import Button from "../components/CustomButton";
import { InstallmentModal } from "../components/InstallmentModal";
import { useFinancialManagement } from "../hooks/useFinancialManagement"; 

export default function StudentDetailsScreen({ navigation, route }) {
  const { alunoId } = route.params;

  const {
    student,
    installments,
    selectedInstallment,
    isModalVisible,
    openModal,
    closeModal,
    saveInstallment,
    removeInstallment,
    setSelectedInstallment,
  } = useFinancialManagement(alunoId);

const StudentInfo = () => (
    <>
      <Input
        label="ID"
        value={String(alunoId)}
        editable={false}
        style={styles.input}
      />
      <Input
        label="Nome" 
        value={student?.nome_aluno || ""} 
        editable={false}
        style={styles.input}
      />
      <Input
        label="CPF"
        value={student?.cpf_aluno || ""}
        editable={false}
        style={styles.input}
      />
    </>
  );

  const InstallmentCard = ({ installment }) => (
    <Pressable
      key={installment.id_parcela}
      style={styles.parcelaCard}
      onPress={() => openModal(installment)}
    >
      <Text style={styles.parcelaText}>
        Vencimento: {installment.data_vencimento} - Valor: R$ {installment.valor} 
      </Text>
      <Button
        title="Excluir" 
        icon="delete"
        onPress={() => removeInstallment(installment.id_parcela)}
        style={styles.deleteButton}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Aluno</Text> 
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StudentInfo />

        <Text style={styles.subTitle}>Parcelas</Text> 
        {installments.map((installment) => (
          <InstallmentCard key={installment.id_parcela} installment={installment} />
        ))}
      </ScrollView>

      <View style={styles.footerContainer}>
        <Button
          title="Adicionar Parcela" 
          icon="add"
          onPress={() => openModal()}
          style={styles.addButton}
        />
        <View style={styles.actionButtonContainer}>
          <Button
            title="Editar Aluno" 
            icon="edit"
            onPress={() => navigation.navigate("StudentRegistrationScreen", { student: student })} // Rota Corrigida
            style={[styles.actionButton, styles.editButton]}
          />
        </View>
      </View>

      <InstallmentModal 
        isVisible={isModalVisible}
        onClose={closeModal}
        selectedInstallment={selectedInstallment}
        onInstallmentChange={setSelectedInstallment}
        onSave={saveInstallment}
        styles={styles}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Montserrat",
    color: "#0056B3",
    marginBottom: 15,
  },
  modalInput: {
    marginBottom: 15,
    width: "100%",
  },
  modalButtonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    width: "80%",
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: "#0056B3",
    width: "80%",
    marginVertical: 5,
  },
});