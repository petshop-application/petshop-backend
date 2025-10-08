const petService = require('../services/petService');

const clientController = {
    getAllPets: async (req, res) => {
        try {
            const pets = await petService.getAllPets();
            res.json(pets);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createPet: async (req, res) => {
        try {
            const pet = await petService.createPet(req.body);
            res.status(201).json(pet);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deletePet: async (req, res) => {
        try {
            await petService.deletePet(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
};

module.exports = clientController;