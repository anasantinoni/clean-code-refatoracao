/*
 * Princípios Aplicados:
 * - SRP (Single Responsibility Principle): Funções fazem uma única coisa.
 * - DRY (Don't Repeat Yourself): A lógica de erro é centralizada.
 * - Tipagem Forte (TypeScript): Uso de Interfaces e Enums.
 * - Código Limpo: Remoção de 'any' e melhor legibilidade.
 */
interface MockUser {
  uid: string;
  email: string;
  password: string;
}
interface AuthSession {
  uid: string;
  email: string;
}

enum AuthErrorCode {
  UserNotFound = "auth/user-not-found",
  InvalidCredential = "auth/invalid-credential",
  EmailAlreadyInUse = "auth/email-already-in-use",
}

class AuthError extends Error {
  code: AuthErrorCode;
  constructor(message: string, code: AuthErrorCode) {
    super(message);
    this.name = "AuthError";
    this.code = code;
  }
}

const STORAGE_USERS_KEY = "mock_auth_users_v1";
const STORAGE_SESSION_KEY = "mock_auth_session_v1";

function createAuthError(code: AuthErrorCode): AuthError {
  const messages = {
    [AuthErrorCode.UserNotFound]: "Utilizador não encontrado.",
    [AuthErrorCode.InvalidCredential]: "Email ou senha inválidos.",
    [AuthErrorCode.EmailAlreadyInUse]: "Este email já está em uso.",
  };
  return new AuthError(messages[code], code);
}

const storage = (() => {
  const isLocalStorageAvailable = typeof localStorage !== "undefined";
  const memory: Record<string, string> = {};

  return {
    get(key: string): string | null {
      try {
        if (isLocalStorageAvailable) {
          return localStorage.getItem(key);
        }
        return memory[key] ?? null;
      } catch (e) {
        return null;
      }
    },
    set(key: string, value: string) {
      if (isLocalStorageAvailable) {
        localStorage.setItem(key, value);
      } else {
        memory[key] = value;
      }
    },
    remove(key: string) {
      if (isLocalStorageAvailable) {
        localStorage.removeItem(key);
      } else {
        delete memory[key];
      }
    },
  };
})();

function loadUsers(): MockUser[] {
  const raw = storage.get(STORAGE_USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as MockUser[];
  } catch {
    return [];
  }
}

function saveUsers(users: MockUser[]) {
  storage.set(STORAGE_USERS_KEY, JSON.stringify(users));
}

function createUid(): string {
  return `local-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function findUserByEmail(email: string): MockUser | undefined {
  const users = loadUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function loginUser(email: string, password: string): Promise<{ user: AuthSession }> {
  const user = findUserByEmail(email);

  if (!user) {
    throw createAuthError(AuthErrorCode.UserNotFound);
  }
  if (user.password !== password) {
    throw createAuthError(AuthErrorCode.InvalidCredential);
  }

  const session: AuthSession = { uid: user.uid, email: user.email };
  storage.set(STORAGE_SESSION_KEY, JSON.stringify(session));
  return { user: session };
}

export async function registerUser(email: string, password: string): Promise<{ user: AuthSession }> {
  if (findUserByEmail(email)) {
    throw createAuthError(AuthErrorCode.EmailAlreadyInUse);
  }

  const newUser: MockUser = {
    uid: createUid(),
    email,
    password,
  };

  const users = loadUsers();
  users.push(newUser);
  saveUsers(users);

  const session: AuthSession = { uid: newUser.uid, email: newUser.email };
  storage.set(STORAGE_SESSION_KEY, JSON.stringify(session));

  return { user: session };
}

export function verifyAuth(): boolean {
  const raw = storage.get(STORAGE_SESSION_KEY);
  return !!raw;
}

export async function logout() {
  storage.remove(STORAGE_SESSION_KEY);
}

/* Conta de Teste*/

function ensureTestAccount() {
  const email = "teste@local.test";
  const password = "Senha123!";
  if (!findUserByEmail(email)) {
    const users = loadUsers();
    users.push({ uid: createUid(), email, password });
    saveUsers(users);
  }
}

if (process.env.NODE_ENV === "development") {
  ensureTestAccount();
}

export default { loginUser, registerUser, verifyAuth, logout };