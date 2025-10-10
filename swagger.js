const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PetShop',
            version: '1.0.0',
            description: 'Documentação da API do sistema de PetShop',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID do usuário' },
                        name: { type: 'string', description: 'Nome do usuário' },
                        cpf: { type: 'string', description: 'CPF do usuário' },
                        perfil: { type: 'string', format: 'string', description: 'admin ou client' },
                    },
                    example: {
                        id: 1,
                        name: "Jane Smith",
                        perfil: "client",
                        cpf: "111111111111",
                    },
                },
                Client: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID do cliente' },
                        name: { type: 'string', description: 'Nome do cliente' },
                        cpf: { type: 'string', description: 'CPF do cliente' },
                        createdAt: { type: 'string', format: 'date-time', description: 'Data de criação do cliente' },
                    },
                    example: {
                        id: 1,
                        name: 'Client Demo',
                        cpf: '11111111111',
                        createdAt: '2025-10-03T03:58:54.198Z',
                    },
                },
                Breed: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID da raça' },
                        description: { type: 'string', description: 'Descrição da raça' },
                    },
                    example: {
                        id: 1,
                        description: 'Vira-lata',
                    },
                },
                Pet: {
                    type: 'object',
                    required: ['id', 'name', 'birthday'],
                    properties: {
                        id: { type: 'integer', description: 'ID do pet' },
                        name: { type: 'string', description: 'Nome do pet' },
                        birthday: { type: 'string', format: 'date-time', description: 'Data de nascimento do pet (em formato ISO 8601)' },
                        Client: { $ref: '#/components/schemas/Client' },
                        Breed: { $ref: '#/components/schemas/Breed' },
                    },
                    additionalProperties: false,
                    example: {
                        id: 1,
                        name: 'Buddy',
                        birthday: '2020-01-01T00:00:00.000Z',
                        Client: {
                            id: 1,
                            name: 'Client Demo',
                            cpf: '11111111111',
                            createdAt: '2025-10-03T03:58:54.198Z',
                        },
                        Breed: {
                            id: 1,
                            description: 'Golden Retriever',
                        },
                    },
                },
                PetResponse: {
                    type: 'object',
                    required: ['id', 'name', 'birthday', 'clientId', 'breedId'],
                    properties: {
                        id: { type: 'integer', description: 'ID do pet' },
                        name: { type: 'string', description: 'Nome do pet' },
                        birthday: { type: 'string', format: 'date-time', description: 'Data de nascimento do pet (em formato ISO 8601)' },
                        clientId: { type: 'integer', description: 'ID do cliente associado ao pet' },
                        breedId: { type: 'integer', description: 'ID da raça do pet' },
                    },
                    additionalProperties: false,
                    example: {
                        id: 1,
                        name: 'Buddy',
                        birthday: '2020-01-01T00:00:00.000Z',
                        clientId: 1,
                        breedId: 1,
                    },
                },
                Treatment: {
                    type: 'object',
                    required: ['id', 'description', 'date', 'cost'],
                    properties: {
                        id: { type: 'integer', description: 'ID do atendimento' },
                        description: { type: 'string', description: 'Descrição do atendimento' },
                        date: { type: 'string', format: 'date-time', description: 'Data do atendimento (em formato ISO 8601)' },
                        cost: { type: 'number', format: 'float', description: 'Valor do atendimento' },
                        Pet: { $ref: '#/components/schemas/Pet' },
                    },
                    additionalProperties: false,
                    example: {
                        id: 1,
                        petName: 'Buddy',
                        description: 'Regular Checkup',
                        date: '2025-10-03T03:58:54.315Z',
                        cost: 100.00,
                        Pet: {
                            id: 1,
                            name: 'Buddy',
                            birthday: '2020-01-01T00:00:00.000Z',
                        },
                    },
                },
                TreatmentResponse: {
                    type: 'object',
                    required: ['id', 'description', 'date', 'cost', 'petId'],
                    properties: {
                        id: { type: 'integer', description: 'ID do atendimento' },
                        description: { type: 'string', description: 'Descrição do atendimento' },
                        date: { type: 'string', format: 'date-time', description: 'Data do atendimento (em formato ISO 8601)' },
                        cost: { type: 'number', format: 'float', description: 'Valor do atendimento' },
                        petId: { type: 'integer', description: 'ID do pet associado ao atendimento' },
                    },
                    additionalProperties: false,
                    example: {
                        id: 1,
                        description: 'Vacina',
                        date: '2023-10-10T00:00:00.000Z',
                        cost: 150.00,
                        petId: 1,
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;