# VisorCFC – Gestão para Autoescolas

## Integrantes

- Ana Júlia Santinoni
- Janaina Carlos
- Laura Gonçalves

## Descrição

Sistema de gestão para autoescolas, com funcionalidades de cadastro e gerenciamento de alunos, instrutores, funcionários e veículos, agendamento de aulas, controle financeiro e relatórios.

## Repositório Original (antes da refatoração)

https://github.com/anasantinoni/ABP_SOLUCOES/tree/develop

## Repositório Refatorado

https://github.com/anasantinoni/clean-code-refatoracao

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

1. Entrar na pasta do frontend: `cd front`
2. Instalar dependências: `npm install`
3. Executar: `npm start`
4. Escolha a opção web `web`

É necessário ter instalado as dependências web, abra o terminal na pasta `front` e execute:

```bash
npx expo install react-dom@18.3.1 react-native-web@~0.19.13 @expo/metro-runtime@~4.0.1
```

### Observação sobre a refatoração

O módulo `expo-sqlite` foi removido, pois ele não é compatível com o ambiente web utilizado para a execução deste projeto.  
Em substituição, os dados utilizados no sistema foram simulados em memória, permitindo o funcionamento das telas e fluxos principais sem dependências externas.

Essa mudança faz parte da refatoração com foco nos princípios de **Clean Code**, priorizando:

- Legibilidade e clareza do código;
- Compatibilidade entre ambientes;
- Redução de dependências complexas e pouco portáveis.
