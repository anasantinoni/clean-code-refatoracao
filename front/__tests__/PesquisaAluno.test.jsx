import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import StudentSearchScreen from '../screens/StudentSearchScreen';

const mockStudents = [
  { id_aluno: 1, nome_aluno: 'Laura Gonçalves', cpf_aluno: '111.222.333-44' },
  { id_aluno: 2, nome_aluno: 'Ana Julia', cpf_aluno: '555.666.777-88' },
];

const mockSetSearchTerm = jest.fn();
const mockUseStudentSearch = jest.fn();

jest.mock('../hooks/useStudentSearch', () => ({
  useStudentSearch: () => mockUseStudentSearch(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => mockNavigation,
}));

const renderComponent = () => {
  return render(<StudentSearchScreen />);
};

describe('Tela de Pesquisa de Aluno (StudentSearchScreen)', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseStudentSearch.mockReturnValue({
      students: [],
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
    });
  });

  describe('2.2.1 - Renderização inicial', () => {
    it('deve renderizar o campo de pesquisa e o botão de adicionar', () => {
      renderComponent();
      expect(screen.getByPlaceholderText('Ex: João')).toBeOnTheScreen();
      expect(screen.getByText('Adicionar Aluno')).toBeOnTheScreen();
    });

    it('não deve renderizar nenhum card se a lista de alunos estiver vazia', () => {
      renderComponent();
      expect(screen.queryByText(/Nome:/i)).toBeNull();
    });
  });

  describe('2.2.2 - Busca de alunos', () => {
    it('deve renderizar os cards de aluno quando o hook retornar dados', () => {
      mockUseStudentSearch.mockReturnValue({
        students: mockStudents,
        searchTerm: '',
        setSearchTerm: mockSetSearchTerm,
      });
      
      renderComponent();
      
      expect(screen.getByText('Nome: Laura Gonçalves')).toBeOnTheScreen();
      expect(screen.getByText('CPF: 111.222.333-44')).toBeOnTheScreen();
      expect(screen.getByText('Nome: Ana Julia')).toBeOnTheScreen();
    });

    it('deve chamar setSearchTerm ao digitar no campo de pesquisa', () => {
      renderComponent();
      const inputPesquisa = screen.getByPlaceholderText('Ex: João');
      fireEvent.changeText(inputPesquisa, 'Laura');
      
      expect(mockSetSearchTerm).toHaveBeenCalledWith('Laura');
    });
  });

  describe('2.2.3 - Navegação para detalhes', () => {
    it('deve navegar para StudentDetailsScreen ao clicar em um card de aluno', () => {
      mockUseStudentSearch.mockReturnValue({
        students: mockStudents,
        searchTerm: '',
        setSearchTerm: mockSetSearchTerm,
      });
      
      renderComponent();
      const cardLaura = screen.getByText('Nome: Laura Gonçalves');
      fireEvent.press(cardLaura);
      
      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        'StudentDetailsScreen',
        { alunoId: 1 }
      );
    });

    it('deve navegar para StudentRegistrationScreen ao clicar no botão "Adicionar Aluno"', () => {
      renderComponent();
      const botaoAdicionar = screen.getByText('Adicionar Aluno');
      fireEvent.press(botaoAdicionar);
      
      expect(mockNavigation.navigate).toHaveBeenCalledWith('StudentRegistrationScreen');
    });
  });
});