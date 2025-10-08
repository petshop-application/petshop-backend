# Petshop Backend

## Descrição
Backend do Petshop em Node.js

## Requisitos
*Node.js
*PostgresSQL

### Criação do banco de dados

Para criação do bando de dados
```
npx sequelize db:create
```
Para rodar as migrations que realizam a criação das tabelas do banco de dados

```
npx sequelize db:migrate
```

Para desfazer as migrations
```
npx sequelize db:migrate:undo:all
```

Para rodar as seeders que populam as tabelas do banco de dados

```
npx sequelize-cli db:seed:all
```

Para desfazer as seeders
```
npx sequelize-cli db:seed:undo:all
```

### Instalar as dependências

```
npm install
```

### Rodar a aplicação

```
npm run dev
```

### Documentação das APIS

```
http://localhost:3000/api-docs/
```