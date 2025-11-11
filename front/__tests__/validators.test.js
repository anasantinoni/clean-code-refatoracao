import {
  validarCPF,
  validarCelular,
  validarEmail,
  validarData,
} from '../utils/validators.js';

describe('Testes de Utilitários (validators.js)', () => {
  
  describe('2.6.1 - validarCPF', () => {
    it('deve retornar verdadeiro para um CPF válido sem máscara', () => {
      expect(validarCPF('11144477735')).toBe(true);
    });

    it('deve retornar verdadeiro para um CPF válido com máscara', () => {
      expect(validarCPF('111.444.777-35')).toBe(true);
    });

    it('deve retornar falso para um CPF com todos os dígitos iguais', () => {
      expect(validarCPF('11111111111')).toBe(false);
    });

    it('deve retornar falso para um CPF com menos de 11 dígitos', () => {
      expect(validarCPF('123456')).toBe(false);
    });

    it('deve retornar falso para um CPF nulo ou indefinido', () => {
      expect(validarCPF(null)).toBe(false);
      expect(validarCPF(undefined)).toBe(false);
    });
  });

  describe('2.6.2 - validarCelular', () => {
    it('deve retornar verdadeiro para um celular válido com 11 dígitos (com máscara)', () => {
      expect(validarCelular('(48) 99988-7766')).toBe(true);
    });

    it('deve retornar verdadeiro para um celular válido com 10 dígitos (com máscara)', () => {
      expect(validarCelular('(48) 3344-5566')).toBe(true);
    });

    it('deve retornar falso para um celular com menos de 10 dígitos', () => {
      expect(validarCelular('12345')).toBe(false);
    });
  });

  describe('2.6.3 - validarEmail', () => {
    it('deve retornar verdadeiro para um email válido', () => {
      expect(validarEmail('teste@dominio.com')).toBe(true);
    });

    it('deve retornar falso para um email inválido (sem @)', () => {
      expect(validarEmail('teste.dominio.com')).toBe(false);
    });

    it('deve retornar falso para um email inválido (sem .com)', () => {
      expect(validarEmail('teste@dominio')).toBe(false);
    });

    it('deve retornar falso para um email vazio', () => {
      expect(validarEmail('')).toBe(false);
    });
  });

  describe('2.6.4 - validarData', () => {
    it('deve retornar verdadeiro para uma data válida no formato DD/MM/AAAA', () => {
      expect(validarData('11/11/2025')).toBe(true);
    });

    it('deve retornar falso para um formato de data inválido (AAAA-MM-DD)', () => {
      expect(validarData('2025-11-11')).toBe(false);
    });

    it('deve retornar falso para um dia inválido (ex: 32)', () => {
      expect(validarData('32/10/2025')).toBe(false);
    });

    it('deve retornar falso para um mês inválido (ex: 13)', () => {
      expect(validarData('10/13/2025')).toBe(false);
    });
  });
});