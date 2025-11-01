# VisorCFC – Gestão para Autoescolas

## Integrantes

- Ana Júlia Santinoni
- Janaina Carlos
- Laura Gonçalves

## Descrição

Sistema de gestão para autoescolas, com funcionalidades de cadastro e gerenciamento de alunos, instrutores, funcionários e veículos, agendamento de aulas, controle financeiro e relatórios.

## Endereço do repositório

https://github.com/anasantinoni/ABP_SOLUCOES/tree/develop

## Problemas identificados nos arquivos principais de código

- Funções grandes e multifuncionais (`DetalhesAluno.jsx`, `Agenda.jsx`)
- Repetição de lógicas, especialmente modais e validações
- Nomenclaturas inconsistentes ou pouco descritivas
- Tratamento de erros pouco estruturado
- Comentário e código redundante
- Ausência de testes automatizados
- Baixa modularização

## Estratégias de refatoração aplicadas

- Separação de funções, utilitários e serviços
- Padronização e internacionalização de nomes
- Implementação de linter e formatter
- Testes automatizados com Jest/React Testing Library
- Documentação das mudanças via CHANGELOG.md

## Execução

1. Instalar dependências: `npm install`
2. Executar: `npm start`
3. Rodar testes: `npm test`
