# Changelog

Todas as alterações significativas deste projeto são documentadas aqui.  
Segue o padrão Keep a Changelog: https://keepachangelog.com/pt-BR/1.0.0/

### Added

- ESLint e Prettier para padronização do código
- Primeiros testes unitários (Jest + React Testing Library)
- Mensagens de erro visuais para o usuário
- Documento detalhado dos principais problemas encontrados nos arquivos de código
- Definição do plano de refatoração aplicado em VisorCFC

### Changed

- Refatoração das funções longas e multifuncionais em `DetalhesAluno.jsx` e `Agenda.jsx`
- Centralização das validações e manipulação do banco de dados em arquivos utilitários (`utils/`)
- Padronização dos nomes das variáveis e funções para inglês técnico
- Melhoria no feedback de erros (visibilidade ao usuário)
- Estrutura de pastas reorganizada

### Fixed

- Correção de bugs na manipulação de modais e agendamento de aulas

### Removed

- Código comentado e trechos redundantes
