

# Petshop Backend

## Descrição
Este é o backend de uma aplicação para gerenciamento de petshops, desenvolvido em **Node.js** com **Express** e utilizando **PostgreSQL** como banco de dados. O projeto inclui funcionalidades para gerenciamento de clientes, raças, pets, tratamentos, usuários e autenticação, além de documentação de APIs e testes unitários.

O backend é configurado para rodar localmente ou em contêineres com **Docker**, oferecendo uma API RESTful documentada com **Swagger**.

## Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- **Node.js** (versão 20 ou superior)
- **PostgreSQL** (versão 12 ou superior, opcional para execução local)
- **Docker** e **Docker Compose** (opcional, para execução em contêineres)

## Instalação
Para instalar as dependências do projeto, execute:
```bash
npm install
```

## Executando a Aplicação

### Modo Desenvolvimento
Para Executar o projeto localmente em modo de desenvolvimento, certifique-se de ter o banco de dados PostgreSQL instalado e configurado.

Além disso, é necessário criar, na raiz do projeto, um arquivo .env com as seguintes configurações:

```bash
PORT=3000
JWT_SECRET=x9k!Pz$2mQw!8vL3nT7rY6jF
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario_postgresql
DB_PASSWORD=sua_senha_postgresql
DB_NAME=petshop

```

#### Configuração do Banco de Dados
O projeto utiliza o **Sequelize** como ORM para gerenciar o banco de dados PostgreSQL. Siga os passos abaixo para configurar o banco:

1. **Criar o banco de dados**:
   ```bash
   npx sequelize db:create
   ```

2. **Executar as migrations** (cria as tabelas no banco):
   ```bash
   npx sequelize db:migrate
   ```

3. **Desfazer migrations** (se necessário):
   ```bash
   npx sequelize db:migrate:undo:all
   ```

4. **Popular o banco com dados iniciais** (seeders):
   ```bash
   npx sequelize-cli db:seed:all
   ```

5. **Desfazer seeders** (se necessário):
   ```bash
   npx sequelize-cli db:seed:undo:all
   ```

Para rodar o projeto localmente em modo de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`.

### Modo Produção com Docker
Para executar o projeto com **Docker**, certifique-se de ter instalado o Docker e Docker compose.

Utilize o comando abaixo, que sobe a aplicação e o banco de dados em contêineres:
```bash
sudo docker compose up --build -d
```

A aplicação estará acessível em: `http://localhost:3000`.

## Documentação da API
A documentação da API está disponível via **Swagger** e pode ser acessada em:
```
http://localhost:3000/api-docs/
```

## Testes
Os testes unitários estão localizados na pasta `__tests__/unit/` e utilizam **Jest** e **Sinon** para testar os serviços. Os testes mockam dependências como **Sequelize**, **bcrypt** e **jsonwebtoken** para isolar a lógica de negócio.

### Configuração do Ambiente de Testes
Defina o ambiente de teste antes de executar os testes:
```bash
export NODE_ENV=test
```

### Comandos de Teste
- **Rodar todos os testes**:
  ```bash
  npm test
  ```

- **Rodar testes específicos** (exemplo para `clientService`):
  ```bash
  npm test -- clientService.test.js
  ```

- **Rodar testes com cobertura**:
  ```bash
  npm test -- --coverage
  ```

O relatório de cobertura de testes pode ser encontrado em: `coverage/lcov-report/index.html`.

## Estrutura do Projeto
- **`src/`**: Contém o código-fonte da aplicação (controladores, serviços, modelos, etc.).
- **`__tests__/unit/`**: Contém os testes unitários.
- **`migrations/`**: Arquivos de migração do banco de dados.
- **`seeders/`**: Arquivos para popular o banco com dados iniciais.
- **`docker-compose.yml`**: Configuração para rodar a aplicação com Docker.
