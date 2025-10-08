const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */
router.get('/', clientController.getAllClients);

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *               - cpf
 *               - name
 *              properties:
 *               cpf:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Todos os campos são obrigatórios
 */
router.post('/', clientController.createClient);


/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Deleta um cliente pelo ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: cliente deletado
 *       404:
 *         description: cliente não encontrado
 */
router.delete('/:id', clientController.deleteClient);

module.exports = router;