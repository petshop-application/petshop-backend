const clientService = require('../services/clientService');

const clientController = {
    getAllClients: async (req, res) => {
        try {
            const clients = await clientService.getAllClients();
            res.json(clients);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createClient: async (req, res) => {
        try {
            const client = await clientService.createClient(req.body);
            res.status(201).json(client);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteClient: async (req, res) => {
        try {
            await clientService.deleteClient(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
};

module.exports = clientController;