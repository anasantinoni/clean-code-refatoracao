import { useState } from 'react';
import { loginUser, registerUser } from '../actions/auth';
// Mapeamento de erros
const AUTH_ERROR_MESSAGES = {
  'auth/invalid-credential': "Email ou senha inválidos, ou usuário não existe.",
  'auth/invalid-email': "Formato de email inválido ou senha incorreta.",
  'auth/email-already-in-use': "Este email já está em uso.",
  'default': "Ocorreu um erro inesperado. Tente novamente."
};

export const useAuthManagement = (navigation) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Novo estado para exibir erros na UI

  // tratar erros de autenticação
  const handleAuthError = (err) => {
    const errorCode = err.code || 'default';
    const message = AUTH_ERROR_MESSAGES[errorCode] || AUTH_ERROR_MESSAGES['default'];
    setError(message); 
    console.error("Authentication Error:", err);
  };

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginUser(email, password);
      navigation.navigate("Home"); 
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError(null); 
    setLoading(true);
    try {
      await registerUser(email, password);
      navigation.navigate("Login"); 
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
    handleRegister,
  };
};