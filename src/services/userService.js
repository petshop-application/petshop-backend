const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;

const userService = {
    getAllUsers: async () => {
        return await User.findAll({ attributes: ['id', 'name', 'perfil', 'cpf'], });
    },

    getUserById: async (id) => {
        const user = await User.findByPk(
            id,
            {
                attributes: ['id', 'name', 'perfil', 'cpf'],
            }
        );
        if (!user) throw new Error('Usuário não encontrado');
        return user;
    },

    createUser: async (data) => {
        if (!data.name || !data.cpf) throw new Error('Todos os campos são obrigatórios');
        const { cpf, name, perfil, password } = data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            cpf,
            name,
            perfil,
            password: hashedPassword
        });
        return {
            id: user.id,
            cpf: user.cpf,
            name: user.name,
            perfil: user.perfil
        };
    },

    updateUser: async (id, data) => {
        if (!data.name || !data.cpf) throw new Error('Todos os campos são obrigatórios');
        const user = await User.findByPk(id);
        if (!user) throw new Error('Usuário não encontrado');

        const updatedUser = await user.update(data);

        return {
            id: updatedUser.id,
            cpf: updatedUser.cpf,
            name: updatedUser.name,
            perfil: updatedUser.perfil
        };
    },

    deleteUser: async (id) => {
        const user = await User.findByPk(id);
        if (!user) throw new Error('Usuário não encontrado');
        await user.destroy();
    },
};

module.exports = userService;