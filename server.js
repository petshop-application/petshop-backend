const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Habilitar CORS para todas as rotas
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Importando rotas
const userRoutes = require('./src/routes/userRoutes');
const clientRoutes = require('./src/routes/clientRoutes');
const petRoutes = require('./src/routes/petRoutes');
const treatmentRoutes = require('./src/routes/treatmentRoutes');
const breedRoutes = require('./src/routes/breedRoutes');

// Usando rotas
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/breeds', breedRoutes);

// Rota inicial
app.get('/', (req, res) => {
    res.json({ message: 'Bem-vindo ao PetShop!' });
});

// Configuração do Swagger
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/api-docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});