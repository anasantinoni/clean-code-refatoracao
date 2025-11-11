import React from 'react';
import { View, Text, Modal } from 'react-native';
import Input from './CustomInput';
import Button from './CustomButton'; 

export function InstallmentModal({
  isVisible,
  onClose,
  selectedInstallment,
  onInstallmentChange,
  onSave,
  styles 
}) {
  if (!selectedInstallment) return null;

  const isEditing = !!selectedInstallment.id_parcela;

  const handleValueChange = (text) => {
    // Garante que o valor é numérico e lida com vírgulas.
    const numericValue = parseFloat(text.replace(',', '.')) || 0;
    onInstallmentChange({
      ...selectedInstallment,
      valor: numericValue,
    });
  };

  const handleDateChange = (text) => {
    onInstallmentChange({
      ...selectedInstallment,
      data_vencimento: text,
    });
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {isEditing ? "Editar Parcela" : "Adicionar Parcela"}
          </Text>
          <Input
            label="Valor (R$)" 
            value={String(selectedInstallment.valor)}
            onChangeText={handleValueChange}
            style={styles.modalInput}
            keyboardType="numeric"
          />
          <Input
            label="Data de Vencimento (DD/MM/AAAA)" 
            value={selectedInstallment.data_vencimento}
            onChangeText={handleDateChange}
            style={styles.modalInput}
          />
          <View style={styles.modalButtonContainer}>
            <Button
              title="Salvar" 
              onPress={onSave}
              style={styles.saveButton}
            />
            <Button
              title="Fechar" 
              onPress={onClose}
              style={styles.closeButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};