const express = require('express');
const router = express.Router();
const breedController = require('../controllers/breedController');

/**
 * @swagger
 * /api/breeds:
 *   get:
 *     summary: Lista todos as raças
 *     tags: [Breeds]
 *     responses:
 *       200:
 *         description: Lista de raças
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Breed'
 */
router.get('/', breedController.getAllBreeds);

module.exports = router;