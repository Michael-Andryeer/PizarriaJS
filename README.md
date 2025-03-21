# PizzariaJS

PizzariaJS é uma API para gerenciar pedidos de uma pizzaria, desenvolvida com **Node.js** e **Express**. O objetivo do projeto é fornecer uma experiência moderna e eficiente para os clientes e para a equipe da pizzaria.

## 🚀 Funcionalidades

- **Gerenciamento de Pedidos**: Permite que os clientes façam pedidos de pizzas personalizadas através de endpoints da API.
- **Integração com Banco de Dados**: Armazena e gerencia dados de pedidos, clientes e produtos.
- **API RESTful**: Estruturada em Node.js com rotas REST para manipulação de dados.

## 🛠️ Tecnologias Utilizadas

- **Backend**: [Node.js](https://nodejs.org/) e [Express](https://expressjs.com/)
- **Gerenciador de Pacotes**: Yarn ou NPM
- **Banco de Dados**: PostgreSQL (ou outro banco de dados de sua escolha)

## 📦 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/pizzariajs.git
   cd pizzariajs
   ```

2. Instale as dependências:
   ```bash
   yarn install
   # ou
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```properties
   JWT_SECRET=your_secret_key
   DATABASE_URL=postgresql://postgres:123456@db:5432/pizzaria
   ```

4. Inicie o servidor backend:
   ```bash
   yarn start
   # ou
   npm start
   ```

5. Acesse a API no endereço: `http://localhost:3000`

## 🌟 Futuras Melhorias

- Implementação de uma interface gráfica com **Next.js**.
- Adição de autenticação e autorização.
- Melhorias na documentação da API.