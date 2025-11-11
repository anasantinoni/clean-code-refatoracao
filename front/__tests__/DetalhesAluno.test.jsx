import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import StudentDetailsScreen from '../screens/StudentDetailsScreen';

const mockStudent = { id_aluno: 1, nome_aluno: 'Laura Gonçalves', cpf_aluno: '111.222.333-44' };
const mockInstallments = [
  { id_parcela: 101, data_vencimento: '10/10/2025', valor: '150.00' },
  { id_parcela: 102, data_vencimento: '10/11/2025', valor: '150.00' },
];

const mockOpenModal = jest.fn();
const mockRemoveInstallment = jest.fn();
const mockUseFinancialManagement = jest.fn();

jest.mock('../hooks/useFinancialManagement', () => ({
  useFinancialManagement: () => mockUseFinancialManagement(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

const mockRoute = {
  params: {
    alunoId: 1,
  },
};

const renderComponent = () => {
  return render(
    <StudentDetailsScreen navigation={mockNavigation} route={mockRoute} />
  );
};

describe('Tela de Detalhes do Aluno (StudentDetailsScreen)', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFinancialManagement.mockReturnValue({
      student: mockStudent,
      installments: mockInstallments,
      isModalVisible: false,
      openModal: mockOpenModal,
      removeInstallment: mockRemoveInstallment,
      selectedInstallment: null,
      closeModal: jest.fn(),
      saveInstallment: jest.fn(),
      setSelectedInstallment: jest.fn(),
    });
  });

  describe('2.3.1 - Carregamento de dados', () => {
    it('deve renderizar as informações do aluno (nome e CPF) em campos desabilitados', () => {
      renderComponent();
      
      const inputNome = screen.getByDisplayValue('Laura Gonçalves');
      const inputCPF = screen.getByDisplayValue('111.222.333-44');
      
      expect(inputNome).toBeOnTheScreen();
      expect(inputCPF).toBeOnTheScreen();
      expect(inputNome).toBeDisabled();
      expect(inputCPF).toBeDisabled();
    });

    it('deve renderizar a lista de parcelas do aluno', () => {
      renderComponent();
      
      expect(screen.getByText('Vencimento: 10/10/2025 - Valor: R$ 150.00')).toBeOnTheScreen();
      expect(screen.getByText('Vencimento: 10/11/2025 - Valor: R$ 150.00')).toBeOnTheScreen();
    });
  });

  describe('2.3.2 - Ações de CRUD', () => {
    it('deve chamar openModal (para adicionar) ao clicar em "Adicionar Parcela"', () => {
      renderComponent();
      const botaoAdicionar = screen.getByText('Adicionar Parcela');
      fireEvent.press(botaoAdicionar);
      
      expect(mockOpenModal).toHaveBeenCalledTimes(1);
      expect(mockOpenModal).toHaveBeenCalledWith();
    });
    
    it('deve chamar openModal (para editar) ao clicar em uma parcela', () => {
      renderComponent();
      const parcela = screen.getByText('Vencimento: 10/10/2025 - Valor: R$ 150.00');
      fireEvent.press(parcela);
      
      expect(mockOpenModal).toHaveBeenCalledTimes(1);
      expect(mockOpenModal).toHaveBeenCalledWith(mockInstallments[0]);
    });

    it('deve chamar removeInstallment ao clicar em "Excluir" de uma parcela', () => {
      renderComponent();
      const botoesExcluir = screen.getAllByText('Excluir');
      fireEvent.press(botoesExcluir[0]);
      
      expect(mockRemoveInstallment).toHaveBeenCalledTimes(1);
      expect(mockRemoveInstallment).toHaveBeenCalledWith(101);
    });

    it('deve navegar para StudentRegistrationScreen (para editar) ao clicar em "Editar Aluno"', () => {
      renderComponent();
      const botaoEditar = screen.getByText('Editar Aluno');
      fireEvent.press(botaoEditar);
      
      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        'StudentRegistrationScreen',
        { student: mockStudent }
      );
    });
  });
});