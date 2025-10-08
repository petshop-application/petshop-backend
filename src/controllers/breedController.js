const breedService = require('../services/breedService');

const breedController = {
    getAllBreeds: async (req, res) => {
        try {
            const breeds = await breedService.getAllBreeds();
            res.json(breeds);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

};

module.exports = breedController;