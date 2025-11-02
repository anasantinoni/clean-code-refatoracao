
// Mock database for web version only
// Replaces SQLite for browser compatibility

import { alunos as mockAlunos, financeiros as mockFinanceiros, aulas as mockAulas, Aluno, Financeiro, Aula } from "./mockData";

export function useDatabase() {
  // ===================== Helper Functions =====================
  
  function getNewId<T extends { id_aluno?: number; id_parcela?: number; id_aula?: number }>(array: T[], key: keyof T): number {
    return array.length > 0 ? Math.max(...array.map(item => item[key] as number)) + 1 : 1;
  }

  function findIndexById<T extends { [key: string]: any }>(array: T[], key: keyof T, value: any): number {
    return array.findIndex(item => item[key] === value);
  }

  function addItem<T extends { [key: string]: any }>(array: T[], key: keyof T, data: Omit<T, keyof T>): { insertedRowId: number } {
    const newId = getNewId(array, key);
    const newItem = { [key]: newId, ...data } as T;
    array.push(newItem);
    return { insertedRowId: newId };
  }

  function deleteItem<T extends { [key: string]: any }>(array: T[], key: keyof T, value: any) {
    const index = findIndexById(array, key, value);
    if (index >= 0) array.splice(index, 1);
  }

  function getItems<T extends { [key: string]: any }>(array: T[], key?: keyof T, filter?: any): T[] {
    if (key && filter !== undefined) {
      return array.filter(item => item[key].toString() === filter.toString());
    }
    return array;
  }

  // ===================== Alunos CRUD =====================
  async function getAlunos(filter?: string) {
    return filter
      ? mockAlunos.filter(a => a.nome_aluno.toLowerCase().includes(filter.toLowerCase()))
      : mockAlunos;
  }

  async function addAluno(data: Omit<Aluno, "id_aluno">) {
    if (!data.nome_aluno || !data.email_aluno || !data.data_nascimento || !data.cpf_aluno) {
      throw new Error("Aluno data is incomplete");
    }
    return addItem(mockAlunos, "id_aluno", data);
  }

  async function updateAluno(data: Aluno) {
    const index = findIndexById(mockAlunos, "id_aluno", data.id_aluno);
    if (index >= 0) mockAlunos[index] = data;
  }

  async function deleteAluno(id_aluno: number) {
    deleteItem(mockAlunos, "id_aluno", id_aluno);
  }

  // ===================== Financeiro CRUD =====================
  async function getFinanceiros(filter?: string) {
    return getItems(mockFinanceiros, "id_aluno", filter);
  }

  async function addFinanceiro(data: Omit<Financeiro, "id_parcela">) {
    return addItem(mockFinanceiros, "id_parcela", data);
  }

  async function deleteFinanceiro(id_parcela: number) {
    deleteItem(mockFinanceiros, "id_parcela", id_parcela);
  }

  // ===================== Aulas CRUD =====================
  async function getAulas(filter?: string) {
    return getItems(mockAulas, "id_aluno", filter);
  }

  async function addAula(data: Omit<Aula, "id_aula">) {
    return addItem(mockAulas, "id_aula", data);
  }

  async function deleteAula(id_aula: number) {
    deleteItem(mockAulas, "id_aula", id_aula);
  }

  return {
    getAlunos, addAluno, updateAluno, deleteAluno,
    getFinanceiros, addFinanceiro, deleteFinanceiro,
    getAulas, addAula, deleteAula,
  };
}
