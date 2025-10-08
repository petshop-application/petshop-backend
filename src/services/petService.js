const db = require('../models');
const Pet = db.Pet;
const Client = db.Client;
const Breed = db.Breed;
const Sequelize = require('sequelize');

const petService = {
    getAllPets: async () => {
        return await Pet.findAll({
            // attributes: ['id', 'name', 'birthday', [Sequelize.col('Client.name'), 'client'], [Sequelize.col('Breed.description'), 'breed']],
            attributes: ['id', 'name', 'birthday'],
            include: [
                {
                    model: Client,
                    as: 'Client',
                },
                {
                    model: Breed,
                    as: 'Breed',
                },
            ],
        });
    },

    createPet: async (data) => {
        if (!data.name || !data.breedId || !data.clientId) throw new Error('Todos os campos são obrigatórios');
        return await Pet.create(data);
    },

    deletePet: async (id) => {
        const pet = await Pet.findByPk(id);
        if (!pet) throw new Error('Cliente não encontrado');
        await pet.destroy();
    },
};

module.exports = petService;