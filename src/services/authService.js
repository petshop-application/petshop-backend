const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

const ERRORS = {
    USER_NOT_FOUND: 'Usuário não encontrado',
    INVALID_CREDENTIALS: 'Credenciais inválidas',
    MISSING_FIELDS: 'CPF e senha são obrigatórios',
};

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, cpf: user.cpf, perfil: user.perfil },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const authService = {
    login: async (data) => {
        try {
            const { cpf, password } = data;

            if (!cpf || !password) {
                return {
                    success: false,
                    data: null,
                    error: ERRORS.MISSING_FIELDS,
                };
            }
            const user = await User.findOne({ where: { cpf } });
            if (!user) {
                return {
                    success: false,
                    data: null,
                    error: ERRORS.USER_NOT_FOUND,
                };
            }

            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
                return {
                    success: false,
                    data: null,
                    error: ERRORS.INVALID_CREDENTIALS,
                };
            }

            const token = generateToken(user);

            return {
                success: true,
                data: {
                    token,
                    user: { id: user.id, name: user.name, perfil: user.perfil, cpf: user.cpf },
                },
                error: null,
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                error: error.message || 'Erro interno no servidor',
            };
        }
    },

    getUserInfo: async (id) => {
        const user = await User.findByPk(
            id,
            {
                attributes: ['id', 'name', 'perfil', 'cpf'],
            }
        );
        return user;
    },
};

module.exports = authService;