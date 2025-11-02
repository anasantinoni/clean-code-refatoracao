type MockUser = {
  uid: string;
  email: string;
  password: string;
};

const STORAGE_USERS_KEY = "mock_auth_users_v1";
const STORAGE_SESSION_KEY = "mock_auth_session_v1";


// Storage wrapper: usa localStorage quando disponível, senão usa memória (fallback).

const storage = (() => {
  const isLocalStorageAvailable = (() => {
    try {
      return typeof localStorage !== "undefined";
    } catch {
      return false;
    }
  })();

  const memory: Record<string, string> = {};

  return {
    get(key: string) {
      if (isLocalStorageAvailable) {
        return localStorage.getItem(key);
      }
      return memory[key] ?? null;
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

/* ---------- Helpers para usuários mock ---------- */

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

/* ---------- API pública (mesma assinatura usada na UI) ---------- */


export async function loginUser(email: string, password: string) {
  const user = findUserByEmail(email);
  if (!user) {
    const error: any = new Error("auth/user-not-found");
    error.code = "auth/user-not-found";
    throw error;
  }
  if (user.password !== password) {
    const error: any = new Error("auth/invalid-credential");
    error.code = "auth/invalid-credential";
    throw error;
  }

  const session = { uid: user.uid, email: user.email };
  storage.set(STORAGE_SESSION_KEY, JSON.stringify(session));
  return { user: session };
}


export async function registerUser(email: string, password: string) {
  if (findUserByEmail(email)) {
    const error: any = new Error("auth/email-already-in-use");
    error.code = "auth/email-already-in-use";
    throw error;
  }

  const newUser: MockUser = {
    uid: createUid(),
    email,
    password,
  };

  const users = loadUsers();
  users.push(newUser);
  saveUsers(users);

  const session = { uid: newUser.uid, email: newUser.email };
  storage.set(STORAGE_SESSION_KEY, JSON.stringify(session));

  return { user: session };
}

export function verifyAuth() {
  const raw = storage.get(STORAGE_SESSION_KEY);
  return !!raw;
}

export async function logout() {
  storage.remove(STORAGE_SESSION_KEY);
}

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
