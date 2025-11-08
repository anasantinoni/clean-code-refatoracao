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

## Testes Implementados

Para garantir a estabilidade do sistema após a refatoração, foi implementada uma suíte de testes unitários com Jest e React Testing Library.

### 2.1. `CadastrarAluno.test.jsx` ,
* **13 testes** organizados em 4 grupos:
    * Renderização de componentes
    * Validações de campos
    * Cadastro de aluno
    * Integração com banco de dados 
* **Cobertura:** 

### 2.2. `PesquisaAluno.test.jsx` ,
* **7 testes** organizados em 4 grupos:
    * Renderização inicial
    * Busca de alunos
    * Navegação para detalhes
    * Tratamento de erros
* **Cobertura:** 

### 2.3. `DetalhesAluno.test.jsx` ,
* **8 testes** cobrindo CRUD completo:
    * Carregamento de parcelas
    * Adicionar parcela
    * Editar parcela
    * Excluir parcela
* **Cobertura:** 

### 2.4. `Agenda.test.jsx` 
* **6 testes** de agendamento.
* **Cobertura:** 

### 2.5. `FinanceiroAluno.test.jsx` 
* **5 testes** de relatórios.
* **Cobertura:** 

### 2.6. Utilitários (`validators.test.js`)
* **12 testes** para validações:
    * validarCPF (com e sem máscara)
    * validarCelular
    * validarEmail
    * validarData
* **Cobertura:** 

## Sugestão de Interface Fluente

O objetivo desta abordagem é melhorar a legibilidade e a manutenção das operações de acesso a dados. Uma interface fluente permite que métodos sejam encadeados de forma lógica e expressiva, alinhando-se aos princípios do Clean Code ao tornar o código mais claro e próximo da linguagem de domínio (como "buscar tabela X, onde a condição Y, e atualizar com Z").

A sugestão consiste em criar uma camada de abstração para as consultas, substituindo queries manuais por uma sintaxe mais limpa.

## Exemplo da Estrutura Sugerida

O objetivo desta abordagem é melhorar a legibilidade e a manutenção das operações de acesso a dados. Uma interface fluente permite que métodos sejam encadeados de forma lógica e expressiva, alinhando-se aos princípios do Clean Code ao tornar o código mais claro e próximo da linguagem de domínio (como "buscar tabela X, onde a condição Y, e atualizar com Z").

A sugestão consiste em criar uma camada de abstração para as consultas, substituindo queries manuais por uma sintaxe mais limpa

Em vez de escrever queries SQL complexas como strings (como seria no SQLite original):

```sql
db.executeSql("UPDATE alunos SET nome = ?, status = ? WHERE id = ?", ["Novo Nome", "ativo", 1]);
```

A interface fluente permitiria uma sintaxe encadeada e muito mais legível:
```javascript
db.table("alunos")
 .where("id", "=", 1)
 .update({
 nome: "Novo Nome",
 status: "ativo"
 });
```
