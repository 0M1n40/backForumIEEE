# backForumIEEE

API backend para um fórum de dúvidas, desenvolvido em Node.js, Express e MySQL.

## Sumário

- [Descrição](#descrição)
- [Tecnologias](#tecnologias)
- [Como rodar](#como-rodar)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts npm](#scripts-npm)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Endpoints principais](#endpoints-principais)

## Descrição

Este projeto é um backend para um fórum, permitindo cadastro e autenticação de usuários, criação de perguntas, respostas, categorias e administração.

## Tecnologias

- Node.js
- Express
- MySQL
- Knex.js
- JWT (autenticação)
- Docker (opcional)

## Como rodar

1. Instale as dependências:
   ```sh
   npm install
   ```

2. Configure o arquivo `.env` (veja o exemplo em `.env.example`).

3. Execute as migrações do banco:
   ```sh
   npm run migrate
   ```

4. Inicie o servidor:
   ```sh
   npm start
   ```

Ou use Docker Compose:
```sh
docker-compose up --build
```

## Variáveis de ambiente

Veja o arquivo [.env.example](.env.example) para todas as variáveis necessárias.

## Scripts npm

- `npm start` — inicia o servidor em produção
- `npm run dev` — inicia o servidor com reload automático
- `npm run migrate` — executa as migrações
- `npm run migrate:rollback` — desfaz a última migração

## Estrutura de pastas

```
src/
  server.js
  db/
    knex.js
    migrations/
  middleware/
  models/
  routes/
```

## Endpoints principais

- `POST /api/auth/register` — cadastro de usuário
- `POST /api/auth/login` — login e obtenção de token JWT
- `GET /api/duvidas` — lista perguntas
- `POST /api/duvidas` — cria pergunta (autenticado)
- `GET /api/respostas` — lista respostas
- `POST /api/respostas` — cria resposta (autenticado)
- `GET /api/categorias` — lista categorias
- `POST /api/categorias` — cria categoria (autenticado)
- `GET /api/admin` — rota protegida para admin

---

> Projeto desenvolvido para o IEEE Ramo Estudantil.