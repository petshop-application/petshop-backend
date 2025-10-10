const db = require('../models');
const Client = db.Client;

const clientService = {
    getAllClients: async (perfil, cpf) => {
        if (perfil === 'client') {
            const client = await Client.findOne({ where: { cpf } });
            if (!client) throw new Error('Cliente não encontrado');
            return [client];
        }
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