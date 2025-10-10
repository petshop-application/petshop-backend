const treatmentService = require('../services/treatmentService');

const treatmentController = {
    getAllTreatments: async (req, res) => {
        try {
            const { perfil, cpf } = req.user;
            const treatment = await treatmentService.getAllTreatments(perfil, cpf);
            res.json(treatment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createTreatment: async (req, res) => {
        try {
            const treatment = await treatmentService.createTreatment(req.body);
            res.status(201).json(treatment);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteTreatment: async (req, res) => {
        try {
            await treatmentService.deleteTreatment(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
};

module.exports = treatmentController;