import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import StudentRegistrationScreen from '../screens/StudentRegistrationScreen';

const mockHandleChange = jest.fn();
const mockHandleRegister = jest.fn();
const mockUseStudentRegistration = jest.fn();

jest.mock('../hooks/useStudentRegistration', () => ({
  useStudentRegistration: () => mockUseStudentRegistration(),
}));

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const renderComponent = () => {
  return render(<StudentRegistrationScreen navigation={mockNavigation} />);
};

describe('Tela de Cadastro de Aluno (StudentRegistrationScreen)', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseStudentRegistration.mockReturnValue({
      studentData: {},
      loading: false,
      error: null,
      handleChange: mockHandleChange,
      handleRegister: mockHandleRegister,
    });
  });

  describe('2.1.1 - Renderização de componentes', () => {
    
    it('deve renderizar o campo "Nome Completo"', () => {
      renderComponent();
      expect(screen.getByPlaceholderText('Digite o nome completo')).toBeOnTheScreen();
    });

    it('deve renderizar o campo "CPF"', () => {
      renderComponent();
      expect(screen.getByPlaceholderText('Digite o CPF')).toBeOnTheScreen();
    });

    it('deve renderizar o campo "Renach"', () => {
      renderComponent();
      expect(screen.getByPlaceholderText('Digite o Renach')).toBeOnTheScreen();
    });

    it('deve renderizar o botão "Cadastrar"', () => {
      renderComponent();
      expect(screen.getByText('Cadastrar')).toBeOnTheScreen();
    });
  });

  describe('2.1.2 - Validações e Interações', () => {

    it('deve chamar handleChange("name", ...) ao digitar no campo Nome', () => {
      renderComponent();
      const inputNome = screen.getByPlaceholderText('Digite o nome completo');
      fireEvent.changeText(inputNome, 'Laura');
      
      expect(mockHandleChange).toHaveBeenCalledWith('name', 'Laura');
      expect(mockHandleChange).toHaveBeenCalledTimes(1);
    });

    it('deve chamar handleChange("cpf", ...) ao digitar no campo CPF', () => {
      renderComponent();
      const inputCPF = screen.getByPlaceholderText('Digite o CPF');
      fireEvent.changeText(inputCPF, '123.456.789-00');
      
      expect(mockHandleChange).toHaveBeenCalledWith('cpf', '123.456.789-00');
      expect(mockHandleChange).toHaveBeenCalledTimes(1);
    });

    it('deve exibir um alerta quando o hook retornar um erro', () => {
      const mockAlert = jest.spyOn(Alert, 'alert');
      
      mockUseStudentRegistration.mockReturnValue({
        studentData: {},
        loading: false,
        error: 'CPF já cadastrado.',
        handleChange: mockHandleChange,
        handleRegister: mockHandleRegister,
      });

      renderComponent();
      
      expect(mockAlert).toHaveBeenCalledWith('Erro no Cadastro', 'CPF já cadastrado.');
    });
  });

  describe('2.1.3 e 2.1.4 - Cadastro e Integração', () => {

    it('deve chamar handleRegister ao clicar em "Cadastrar"', () => {
      renderComponent();
      const botaoCadastrar = screen.getByText('Cadastrar');
      fireEvent.press(botaoCadastrar);
      
      expect(mockHandleRegister).toHaveBeenCalledTimes(1);
    });

    it('deve desabilitar o botão de cadastro durante o loading', () => {
      mockUseStudentRegistration.mockReturnValue({
        studentData: {},
        loading: true,
        error: null,
        handleChange: mockHandleChange,
        handleRegister: mockHandleRegister,
      });

      renderComponent();
      const botaoCadastrar = screen.getByText('Cadastrar');
      
      expect(botaoCadastrar).toBeDisabled();
    });
  });
});