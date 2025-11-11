import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ScheduleScreen from '../screens/ScheduleScreen';

const mockAppointments = [
  { id_aula: 1, hora_aula: '08:00', id_aluno: 1, tipo_aula: 1 },
  { id_aula: 2, hora_aula: '10:00', id_aluno: 2, tipo_aula: 0 },
];

const mockOpenModal = jest.fn();
const mockSetShowDatePicker = jest.fn();
const mockHandleDateChange = jest.fn();
const mockUseAgendaManagement = jest.fn();

jest.mock('../hooks/useAgendaManagement', () => ({
  useAgendaManagement: () => mockUseAgendaManagement(),
}));

const renderComponent = () => {
  return render(<ScheduleScreen />);
};

describe('Tela de Agenda (ScheduleScreen)', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAgendaManagement.mockReturnValue({
      selectedDate: new Date('2025-10-10T12:00:00Z'),
      appointments: mockAppointments,
      selectedAppointment: mockAppointments[0],
      isModalVisible: false,
      showDatePicker: false,
      openModal: mockOpenModal,
      closeModal: jest.fn(),
      setShowDatePicker: mockSetShowDatePicker,
      handleDateChange: mockHandleDateChange,
      saveAppointment: jest.fn(),
      setSelectedAppointment: jest.fn(),
    });
  });

  describe('2.4.1 - Testes de Agendamento', () => {
    it('deve renderizar a data selecionada e o botão de adicionar', () => {
      renderComponent();
      
      expect(screen.getByText('10/10/2025')).toBeOnTheScreen();
      expect(screen.getByText('Adicionar Agendamento')).toBeOnTheScreen();
    });

    it('deve renderizar os cards de agendamento', () => {
      renderComponent();
      
      expect(screen.getByText('08:00 - Student: 1')).toBeOnTheScreen();
      expect(screen.getByText('Type: Prática')).toBeOnTheScreen();
      expect(screen.getByText('10:00 - Student: 2')).toBeOnTheScreen();
      expect(screen.getByText('Type: Teórica')).toBeOnTheScreen();
    });

    it('deve chamar setShowDatePicker ao clicar na data', () => {
      renderComponent();
      const inputData = screen.getByText('10/10/2025');
      fireEvent.press(inputData);
      
      expect(mockSetShowDatePicker).toHaveBeenCalledWith(true);
    });

    it('deve renderizar o DateTimePicker quando showDatePicker for verdadeiro', () => {
      mockUseAgendaManagement.mockReturnValueOnce({
        ...mockUseAgendaManagement(),
        showDatePicker: true,
      });
      
      renderComponent();
      
      expect(screen.getByTestId('dateTimePicker')).toBeOnTheScreen();
    });

    it('deve chamar openModal ao clicar em "Adicionar Agendamento"', () => {
      renderComponent();
      const botaoAdicionar = screen.getByText('Adicionar Agendamento');
      fireEvent.press(botaoAdicionar);
      
      expect(mockOpenModal).toHaveBeenCalledTimes(1);
      expect(mockOpenModal).toHaveBeenCalledWith();
    });

    it('deve renderizar o Modal quando isModalVisible for verdadeiro', () => {
      mockUseAgendaManagement.mockReturnValueOnce({
        ...mockUseAgendaManagement(),
        isModalVisible: true,
      });
      
      renderComponent();
      
      expect(screen.getByTestId('appointment-modal-content')).toBeOnTheScreen();
    });
  });
});


jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  const { View } = require('react-native');
  return (props) => <View testID="dateTimePicker" {...props} />;
});

jest.mock('../components/AppointmentModalContent', () => {
  const React = require('react');
  const { View } = require('react-native');
  return (props) => <View testID="appointment-modal-content" {...props} />;
});