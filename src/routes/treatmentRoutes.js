const express = require('express');
const router = express.Router();
const treatmentController = require('../controllers/treatmentController');

/**
 * @swagger
 * /api/treatments:
 *   get:
 *     summary: Lista todos os atendimentos
 *     tags: [Treatments]
 *     responses:
 *       200:
 *         description: Lista de atendimentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Treatment'
 */
router.get('/', treatmentController.getAllTreatments);

/**
 * @swagger
 * /api/treatments:
 *   post:
 *     summary: Cria um novo atendimento
 *     tags: [Treatments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - petId
 *               - description
 *               - date
 *               - cost
 *             properties:
 *               petId:
 *                 type: number
 *                 description: ID do pet
 *               description:
 *                 type: string
 *                 description: Descrição do atendimento
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Data do atendimento (em formato ISO 8601)
 *               cost:
 *                 type: number
 *                 format: float
 *                 description: Valor do atendimento
 *             example:
 *               petId: 1
 *               description: Vacina
 *               date: 2023-10-10T00:00:00.000Z
 *               cost: 150.00
 *     responses:
 *       201:
 *         description: Atendimento criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentResponse'
 *       400:
 *         description: Todos os campos são obrigatórios
 */
router.post('/', treatmentController.createTreatment);

/**
 * @swagger
 * /api/treatments/{id}:
 *   delete:
 *     summary: Deleta um atendimento pelo ID
 *     tags: [Treatments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do atendimento
 *     responses:
 *       204:
 *         description: Atendimento deletado
 *       404:
 *         description: Atendimento não encontrado
 */
router.delete('/:id', treatmentController.deleteTreatment);

module.exports = router;