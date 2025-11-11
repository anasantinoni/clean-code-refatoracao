# Changelog

Todas as alterações significativas deste projeto são documentadas aqui.  
Segue o padrão Keep a Changelog: https://keepachangelog.com/pt-BR/1.0.0/

## [1.0.0] - 2025-10-31

### Added

- **Ferramentas de Qualidade:** Adicionado ESLint, Prettier e `.gitignore` para padronização de código.
- **Testes:** Adicionados primeiros testes unitários (Jest + React Testing Library) e documento de análise de problemas.
- **Mock de Dados:** Suporte completo à execução via `Expo Web` com dados mockados (removendo `expo-sqlite`).
- **Custom Hooks (SRP):** Adicionados Hooks para isolar a lógica de negócio das telas:
  - `useFinancialManagement.js` (Detalhes do Aluno)
  - `useAgendaManagement.js` (Agenda)
  - `useAuthManagement.js` (Login/Registro)
  - `useFinancialReport.js` (Relatório Financeiro)
  - `useStudentSearch.js` (Busca de Aluno)
  - `useStudentRegistration.js` (Cadastro de Aluno)
- **Componentes de UI (Modularização):**
  - `InstallmentModal.jsx` (Modal de Parcelas)
  - `AppointmentModalContent.jsx` (Modal de Agendamento)
- **Tratamento de Erros:** Adicionado `AUTH_ERROR_MESSAGES` no Hook de autenticação para feedback claro ao usuário
- **TypeScript (auth.ts):** Adicionadas interfaces `MockUser`, `AuthSession` e enum `AuthErrorCode` para garantir tipagem forte no serviço de autenticação
- **TypeScript (auth.ts):** Adicionada classe `AuthError` e helper `createAuthError` para centralizar a lógica de erros (DRY)

### Changed

- **Refatoração Profunda (SRP):** Todas as telas principais foram refatoradas para usar Custom Hooks, focando apenas na UI:
  - `DetalhesAluno.jsx` -> `StudentDetailsScreen.jsx`
  - `Agenda.jsx` -> `ScheduleScreen.jsx`
  - `FinanceiroAluno.jsx` -> `FinancialReportScreen.jsx`
  - `CadastrarAluno.jsx` -> `StudentRegistrationScreen.jsx`
  - `PesquisaAluno.jsx` -> `StudentSearchScreen.jsx`
  - `Login.jsx`
  - `Registro.jsx` -> `RegisterScreen.jsx`
  - `HomeScreen.jsx`
- **Padronização (Nomenclatura):**
  - Nomes de arquivos, funções e variáveis-chave padronizados para inglês técnico (ex: `carregarParcelas` -> `loadInstallments`).
  - Nomes das Rotas no `App.js` foram padronizados para bater com os nomes dos componentes (ex: `name="FinancialReportScreen"`).
- **Componentes de UI:**
  - `Button.js`, `Input.js`, `Card.js`, `DateInput.js` refatorados para `CustomButton`, `CustomInput`, etc.
  - Adicionadas props de estado (`disabled`, `loading`, `editable`) nos componentes de UI para melhor UX e Clean Code.
- **Formulários:** O `StudentRegistrationScreen` (antigo CadastrarAluno) teve 11 `useStates` consolidados em um único objeto de estado no Hook.
- **Autenticação:** Substituída a dependência de serviços externos (Firebase) por dados simulados localmente (mock).

### Fixed

- **Code Smells (Linting):**
  - Corrigidos avisos de variáveis não utilizadas (ex: `event` no `DateTimePicker`) usando `_` (underscore).
  - Removidas importações não utilizadas (ex: `StyleSheet` no `InstallmentModal`, `DatePickerInput` no `ScheduleScreen`).
  - Removidos *code smells* de JSX (ex: `{}` vazias no `Login.jsx`).

### Removed

- **Código Morto (Dead Code):**
  - Removidos `StyleSheet` e `View`/`Text` não utilizados do `App.js`.
- **Dependências:**
  - Remoção do módulo `expo-sqlite` e integração com Firebase Auth.
  - Otimização do `package.json` para remover dependências não utilizadas.
