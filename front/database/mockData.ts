// Tipos e dados simulados para uso com a versão web
// Banco de dados substituído por mocks para facilitar testes

// ===================== Tipos =====================

export type Aluno = {
  id_aluno: number;
  nome_aluno: string;
  email_aluno: string;
  data_nascimento: string;
  cpf_aluno: string;
  renach_aluno?: string;
  celular_aluno?: string;
  rua_aluno?: string;
  numero_residencial_aluno?: string;
  bairro_aluno?: string;
  cidade_aluno?: string;
  estado_aluno?: string;
};

export type Financeiro = {
  id_parcela: number;
  id_aluno: number;
  valor: number;
  data_vencimento: string;
  data_pagamento?: string;
  status: number;
  valor_multa?: number;
  valor_desconto?: number;
  tipo_pagamento?: number;
  tipo_parcela?: number;
};

export type Aula = {
  id_aula: number;
  id_aluno: number;
  id_usuario: number;
  data_aula: string;
  hora_aula: string;
  tipo_aula: number;
  status_aula: number;
  motivo_cancelamento?: string;
  placa_carro?: string;
};

// ===================== Dados simulados =====================

export const alunos: Aluno[] = [
  {
    id_aluno: 1,
    nome_aluno: "Ana Julia",
    email_aluno: "ana@mail.com",
    data_nascimento: "2000-01-01",
    cpf_aluno: "000.000.000-00",
  },
];

export const financeiros: Financeiro[] = [
  {
    id_parcela: 1,
    id_aluno: 1,
    valor: 100,
    data_vencimento: "2025-11-15",
    status: 1,
  },
];

export const aulas: Aula[] = [
  {
    id_aula: 1,
    id_aluno: 1,
    id_usuario: 1,
    data_aula: "2025-11-05",
    hora_aula: "10:00",
    tipo_aula: 1,
    status_aula: 1,
  },
];
