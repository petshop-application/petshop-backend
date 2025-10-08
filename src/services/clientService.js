const db = require('../models');
const Client = db.Client;

const clientService = {
    getAllClients: async () => {
        return await Client.findAll();
    },

    createClient: async (data) => {
        if (!data.name || !data.cpf) throw new Error('Todos os campos são obrigatórios');
        return await Client.create({
            name: data.name,
            cpf: data.cpf,
            createdAt: new Date()
        }
        );
    },

    deleteClient: async (id) => {
        const client = await Client.findByPk(id);
        if (!client) throw new Error('Cliente não encontrado');
        await client.destroy();
    },
};

module.exports = clientService;