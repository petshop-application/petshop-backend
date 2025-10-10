const db = require('../models');
const Treatment = db.Treatment;
const Pet = db.Pet;
const Sequelize = require('sequelize');

const treatmentService = {
    getAllTreatments: async (perfil, cpf) => {
        if (perfil === 'client') {
            const pet = await Pet.findAll({
                where: { '$Client.cpf$': cpf },
                include: [
                    {
                        model: db.Client,
                        as: 'Client',
                        attributes: [],
                    },
                ],
            });
            const petIds = pet.map(p => p.id);
            if (!pet) throw new Error('Pet não encontrado');
            return await Treatment.findAll({
                where: { petId: petIds },
                attributes: ['id', 'description', 'cost', 'date'],
                include: [
                    {
                        model: Pet,
                        as: 'Pet',
                    },
                ],
            });
        }
        return await Treatment.findAll({
            attributes: ['id', 'description', 'cost', 'date'],
            include: [
                {
                    model: Pet,
                    as: 'Pet',
                },
            ],
        });
    },

    createTreatment: async (data) => {
        if (!data.date || !data.petId) throw new Error('Todos os campos são obrigatórios');
        return await Treatment.create(data);
    },

    deleteTreatment: async (id) => {
        const treatment = await Treatment.findByPk(id);
        if (!treatment) throw new Error('Atendimento não encontrado');
        await treatment.destroy();
    },
};

module.exports = treatmentService;