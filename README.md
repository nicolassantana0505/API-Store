# 🛒 API Store — REST API

Uma API REST desenvolvida com **Node.js, Express e MongoDB**, com o objetivo de gerenciar as principais operações de uma loja virtual.

O projeto foi desenvolvido para colocar em prática conceitos de desenvolvimento backend, como autenticação de usuários, controle de permissões, validação de dados e gerenciamento de produtos e pedidos.

## 🚀 Tecnologias utilizadas

- **Node.js** — Ambiente de execução JavaScript.
- **Express** — Framework para construção das rotas e gerenciamento das requisições HTTP.
- **MongoDB** — Banco de dados NoSQL.
- **Mongoose** — Modelagem e comunicação com o banco de dados.
- **JWT (JSON Web Token)** — Autenticação de usuários.
- **Bcrypt** — Criptografia de senhas.
- **Zod** — Validação de dados recebidos pela API.
- **Dotenv** — Gerenciamento de variáveis de ambiente.
- **Postman** — Testes e validação dos endpoints.

## ⚙️ Funcionalidades

### 👤 Usuários e autenticação
- Cadastro de usuários.
- Login com autenticação JWT.
- Proteção de rotas privadas.
- Criptografia de senhas com Bcrypt.
- Controle de permissões para administradores.

### 📦 Produtos
- Cadastro de produtos.
- Listagem de produtos.
- Consulta de produtos individuais.
- Atualização e exclusão de produtos.
- Filtros e paginação para facilitar as consultas.

### 🛍️ Pedidos
- Criação de pedidos.
- Associação dos pedidos ao usuário autenticado.
- Listagem dos pedidos do usuário logado.
- Atualização do status dos pedidos por administradores.

### 🛡️ Segurança e validação
- Validação de dados com Zod.
- Autenticação por tokens JWT.
- Controle de acesso por nível de permissão.
- Senhas armazenadas de forma criptografada.

## 💻 Como executar o projeto

### 1. Clone o repositório


git clone https://github.com/nicolassantana0505/API-Store.git


### 2. Entre na pasta do projeto

```bash
cd API-Store
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias:

```env
PORT=3000
MONGO_URI=sua_url_do_mongodb
JWT_SECRET=sua_chave_secreta
```

*Utilize os nomes das variáveis definidos na configuração do seu projeto.*

### 5. Inicie a aplicação

```bash
npm start
```

Ou, caso não tenha um script de desenvolvimento configurado:

```bash
node server.js
```

## 🧪 Testes da API

Os endpoints podem ser testados utilizando o **Postman**, permitindo verificar requisições HTTP, autenticação, validações e respostas da aplicação.

## 🎯 Objetivo do projeto

Este projeto representa parte da minha evolução no desenvolvimento backend, explorando na prática a construção de uma API REST, integração com banco de dados, autenticação, segurança e organização de rotas.

Mais do que desenvolver operações CRUD, o objetivo foi entender como estruturar uma aplicação backend que simula funcionalidades reais de uma loja virtual.

---

**Desenvolvido por Nicolas Sant'Ana**
