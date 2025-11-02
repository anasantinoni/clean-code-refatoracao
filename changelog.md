# Changelog

Todas as alterações significativas deste projeto são documentadas aqui.  
Segue o padrão Keep a Changelog: https://keepachangelog.com/pt-BR/1.0.0/

## [1.0.0] - 2025-10-31

### Added

- ESLint e Prettier para padronização do código
- Primeiros testes unitários (Jest + React Testing Library)
- Mensagens de erro visuais para o usuário
- Documento detalhado dos principais problemas encontrados nos arquivos de código
- Definição do plano de refatoração aplicado em VisorCFC
- Suporte completo à execução via `Expo Web` com dados mockados, removendo necessidade de ambiente Android/iOS
- Adicionado `.gitignore`

### Changed

- Refatoração das funções longas e multifuncionais em `DetalhesAluno.jsx` e `Agenda.jsx`
- Centralização das validações e manipulação do banco de dados em arquivos utilitários (`utils/`)
- Padronização dos nomes das variáveis e funções para inglês técnico
- Melhoria no feedback de erros (visibilidade ao usuário)
- Estrutura de pastas reorganizada
- Substituição do acesso a banco de dados local por dados simulados em memória (mock)
- Autenticação agora utiliza dados de login simulados localmente (mock), substituindo a dependência de serviços externos
- Mantida a navegação e fluxo de login originais para preservar a experiência do usuário
- Simplificação da estrutura de execução (scripts)
- Otimização do arquivo package.json, garantindo apenas dependências realmente utilizadas no código
- Redução do tamanho do projeto e melhoria na legibilidade e manutenção geral

### Fixed

- Correção de bugs na manipulação de modais e agendamento de aulas

### Removed

- Código comentado e trechos redundantes
- Remoção do módulo `expo-sqlite`
- Função `initializeDatabase`
- Integração com Firebase Authentication (ou outros provedores externos de login)
- Chamadas e dependências de autenticação remota, garantindo compatibilidade completa com a execução em ambiente web/localhost
