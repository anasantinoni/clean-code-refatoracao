import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import FinancialReportScreen from '../screens/FinancialReportScreen';

const mockSetStartDate = jest.fn();
const mockSetEndDate = jest.fn();
const mockUseFinancialReport = jest.fn();

jest.mock('../hooks/useFinancialReport', () => ({
  useFinancialReport: () => mockUseFinancialReport(),
}));

jest.mock('react-native-chart-kit', () => ({
  PieChart: (props) => <View testID="pie-chart" {...props} />,
}));

const renderComponent = () => {
  return render(<FinancialReportScreen />);
};

describe('Tela de Relatório Financeiro (FinancialReportScreen)', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFinancialReport.mockReturnValue({
      startDate: new Date('2025-10-01T12:00:00Z'),
      setStartDate: mockSetStartDate,
      endDate: new Date('2025-10-31T12:00:00Z'),
      setEndDate: mockSetEndDate,
      totalReceivable: 1500.50,
      totalPayable: 350.75,
    });
  });

  describe('2.5.1 - Testes de Relatórios', () => {
    it('deve renderizar o título e os seletores de data', () => {
      renderComponent();
      
      expect(screen.getByText('Relatório Financeiro')).toBeOnTheScreen();
      expect(screen.getByText('01/10/2025')).toBeOnTheScreen();
      expect(screen.getByText('31/10/2025')).toBeOnTheScreen();
    });

    it('deve renderizar os cards de totais com valores formatados', () => {
      renderComponent();
      
      expect(screen.getByText('Total a Receber')).toBeOnTheScreen();
      expect(screen.getByText('R$ 1500.50')).toBeOnTheScreen();
      
      expect(screen.getByText('Total a Pagar')).toBeOnTheScreen();
      expect(screen.getByText('R$ 350.75')).toBeOnTheScreen();
    });

    it('deve renderizar o gráfico de pizza (PieChart)', () => {
      renderComponent();
      expect(screen.getByTestId('pie-chart')).toBeOnTheScreen();
    });

    it('deve exibir o DateTimePicker para data inicial ao ser clicado', () => {
      renderComponent();
      
      const inputDataInicial = screen.getByText('01/10/2025');
      fireEvent.press(inputDataInicial);
      
      const picker = screen.getByTestId('dateTimePicker-start');
      expect(picker).toBeOnTheScreen();
    });

    it('deve exibir o DateTimePicker para data final ao ser clicado', () => {
      renderComponent();
      
      const inputDataFinal = screen.getByText('31/10/2025');
      fireEvent.press(inputDataFinal);
      
      const picker = screen.getByTestId('dateTimePicker-end');
      expect(picker).toBeOnTheScreen();
    });
  });
});


jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  const { View } = require('react-native');
  return (props) => {
    const testID = props.onChange.toString().includes('setStartDate')
      ? 'dateTimePicker-start'
      : 'dateTimePicker-end';
    return <View testID={testID} {...props} />;
  };
});


jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Svg: (props) => <View {...props} />,
    Path: (props) => <View {...props} />,
    G: (props) => <View {...props} />,
    Text: (props) => <View {...props} />,
  };
});