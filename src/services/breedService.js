const db = require('../models');
const Breed = db.Breed;

const breedService = {
    getAllBreeds: async () => {
        return await Breed.findAll();
    },
};

module.exports = breedService;