const db = require('../models');
const User = db.User;

const userService = {
    getAllUsers: async () => {
        return await User.findAll();
    },

    getUserById: async (id) => {
        const user = await User.findByPk(id);
        if (!user) throw new Error('Usuário não encontrado');
        return user;
    },

    createUser: async (data) => {
        if (!data.name || !data.cpf) throw new Error('Todos os campos são obrigatórios');
        return await User.create(data);
    },

    updateUser: async (id, data) => {
        if (!data.name || !data.cpf) throw new Error('Todos os campos são obrigatórios');
        const user = await User.findByPk(id);
        if (!user) throw new Error('Usuário não encontrado');
        return await user.update(data);
    },

    deleteUser: async (id) => {
        const user = await User.findByPk(id);
        if (!user) throw new Error('Usuário não encontrado');
        await user.destroy();
    },
};

module.exports = userService;