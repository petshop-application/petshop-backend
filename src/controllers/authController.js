const authService = require('../services/authService');

const authController = {
    login: async (req, res) => {
        const result = await authService.login(req.body);
        if (!result.success) {
            if (result.error === 'Usuário não encontrado') {
                return res.status(404).json({ message: result.error });
            }
            if (result.error === 'Credenciais inválidas' || result.error === 'CPF e senha são obrigatórios') {
                return res.status(401).json({ message: result.error });
            }
            return res.status(500).json({ message: result.error });
        }

        res.json(result.data);
    },
    getUserInfo: async (req, res) => {
        try {
            const user = await authService.getUserInfo(req.user.id);
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter usuário', error: error.message });
        }
    },
};

module.exports = authController;