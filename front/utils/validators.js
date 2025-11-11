const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_DATA_DDMMAAAA = /^\d{2}\/\d{2}\/\d{4}$/;

const normalizarTextoNumerico = (texto) => {
  if (!texto) return '';
  return texto.replace(/\D/g, '');
};

export const validarCPF = (cpf) => {
  if (!cpf) return false;

  const cpfLimpo = normalizarTextoNumerico(cpf);

  if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;

  return true;
};

export const validarCelular = (celular) => {
  const celularLimpo = normalizarTextoNumerico(celular);
  
  const temDezOuOnzeDigitos = /^(\d{10}|\d{11})$/.test(celularLimpo);
  return temDezOuOnzeDigitos;
};

export const validarEmail = (email) => {
  if (!email) return false;
  return REGEX_EMAIL.test(email);
};

export const validarData = (data) => {
  if (!data || !REGEX_DATA_DDMMAAAA.test(data)) {
    return false;
  }

  const partes = data.split('/');
  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10);
  const ano = parseInt(partes[2], 10);

  if (ano < 1900 || mes < 1 || mes > 12) {
    return false;
  }

  const dataObj = new Date(ano, mes - 1, dia);

  const dataEhValida =
    !isNaN(dataObj.getTime()) &&
    dataObj.getDate() === dia &&
    dataObj.getMonth() === mes - 1 &&
    dataObj.getFullYear() === ano;

  return dataEhValida;
};