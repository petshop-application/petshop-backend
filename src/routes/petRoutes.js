const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Lista todos os pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 */
router.get('/', petController.getAllPets);

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Cria um novo pet
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthday
 *               - clientId
 *               - breedId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do pet
 *               birthday:
 *                 type: string
 *                 format: date-time
 *                 description: Data de nascimento do pet (em formato ISO 8601)
 *               clientId:
 *                 type: integer
 *                 description: ID do cliente associado ao pet
 *               breedId:
 *                 type: integer
 *                 description: ID da raça do pet
 *             example:
 *               name: Buddy
 *               birthday: 2020-01-01T00:00:00.000Z
 *               clientId: 1
 *               breedId: 1
 *     responses:
 *       201:
 *         description: Pet criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PetResponse'
 *       400:
 *         description: Todos os campos são obrigatórios
 */
router.post('/', petController.createPet);

/**
 * @swagger
 * /api/pets/{id}:
 *   delete:
 *     summary: Deleta um pet pelo ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *     responses:
 *       204:
 *         description: Pet deletado
 *       404:
 *         description: Pet não encontrado
 */
router.delete('/:id', petController.deletePet);

module.exports = router;