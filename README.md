<div align="center">
  <h1>Locadora API</h1>
</div>

Rest API para um sistema de locadora de filmes.

## Funcionalidades
- Criação de usuários
- Login / Logout
- Criação de filmes
- Listagem de filmes
- Listagem de filmes disponíveis
- Pesquisa de filme por título
- Aluguel de um filme
- Devolução de um filme

## Pré-requisitos
- Node.Js 14.x
- Banco de dados PostgreSQL, com a base de dados criada com permissão de leitura/escrita

## Instalação

- Clone o repositório e instale as dependências:
```bash
git clone https://github.com/alissonsv/locadora-api
cd locadora-api
npm install
```

- Crie um arquivo `.env` na raiz com as variáveis de  `.env.example` e preencha os parâmetros:

Variável         | Descrição
-----------------|------------
DB_USERNAME      | Usuário do banco de dados
DB_PASSWORD      | Senha do usuário no banco de dados
DB_DATABASE      | Nome da tabela no banco de dados
DB_HOST          | Host onde está rodando o banco de dados
JWT_SECRET       | Senha para assinar o JWT

- Execute o comando para gerar as tabelas:

```bash
npx sequelize-cli db:migrate
```

- Rode o sistema: 

```bash
# Inicia em modo de desenvolvimento
npm run dev

# Inicia em modo de produção
npm run start
```

## Documentação
Os endpoints estão documentados na rota `/docs`

## Tecnologias Utilizadas
- [Node.JS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [JWT](https://jwt.io/)
- [Sequelize](https://sequelize.org/)
- [Swagger](https://swagger.io/)