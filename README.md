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

### Executando os Testes
Os testes unitários estão na pasta __tests__/unit/ e usam Jest e Sinon para testar os serviços (clientService, breedService, petService, treatmentService, userService, authService).

#### Configuração
Defina o ambiente de teste:
```
export NODE_ENV=test
```

#### Comandos

Rodar todos os testes:
```
npm test
```

Rodar testes específicos (ex.: clientService):
```
npm test -- clientService.test.js
```

Rodar com cobertura:
```
npm test -- --coverage
```

Os testes mockam o Sequelize, bcrypt e jsonwebtoken para isolar a lógica de negócio. Verifique o relatório de cobertura em coverage/lcov-report/index.html.