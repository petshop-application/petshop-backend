const sinon = require('sinon');
const { expect } = require('chai');
const bcrypt = require('bcrypt');
const userService = require('../../services/userService');
const { User } = require('../../models');

describe('User Service', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            const mockUsers = [
                { id: 1, name: 'John Doe', perfil: 'client', cpf: '12345678901' },
                { id: 2, name: 'Jane Doe', perfil: 'admin', cpf: '98765432109' },
            ];
            sandbox.stub(User, 'findAll').resolves(mockUsers);

            const result = await userService.getAllUsers();

            expect(result).to.deep.equal(mockUsers);
            expect(User.findAll.calledWithMatch({
                attributes: ['id', 'name', 'perfil', 'cpf'],
            })).to.be.true;
        });

        it('should return an empty array if no users are found', async () => {
            sandbox.stub(User, 'findAll').resolves([]);

            const result = await userService.getAllUsers();

            expect(result).to.deep.equal([]);
            expect(User.findAll.calledOnce).to.be.true;
        });

        it('should throw error if findAll fails', async () => {
            sandbox.stub(User, 'findAll').rejects(new Error('Database error'));

            try {
                await userService.getAllUsers();
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Database error');
            }
        });
    });

    describe('getUserById', () => {
        it('should return a user by ID', async () => {
            const mockUser = { id: 1, name: 'John Doe', perfil: 'client', cpf: '12345678901' };
            sandbox.stub(User, 'findByPk').resolves(mockUser);

            const result = await userService.getUserById(1);

            expect(result).to.deep.equal(mockUser);
            expect(User.findByPk.calledWith(1, {
                attributes: ['id', 'name', 'perfil', 'cpf'],
            })).to.be.true;
        });

        it('should throw error if user not found', async () => {
            sandbox.stub(User, 'findByPk').resolves(null);

            try {
                await userService.getUserById(1);
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Usuário não encontrado');
            }
        });
    });

    describe('createUser', () => {
        it('should create a user and return it without password', async () => {
            const mockData = { name: 'John Doe', cpf: '12345678901', perfil: 'client', password: 'password123' };
            const mockHashedPassword = 'hashedPassword';
            const mockUser = { id: 1, ...mockData, password: mockHashedPassword };
            sandbox.stub(bcrypt, 'hash').resolves(mockHashedPassword);
            sandbox.stub(User, 'create').resolves(mockUser);

            const result = await userService.createUser(mockData);

            expect(result).to.deep.equal({ id: 1, name: 'John Doe', cpf: '12345678901', perfil: 'client' });
            expect(bcrypt.hash.calledWith('password123', 10)).to.be.true;
            expect(User.create.calledWith({
                name: 'John Doe',
                cpf: '12345678901',
                perfil: 'client',
                password: mockHashedPassword,
            })).to.be.true;
        });

        it('should throw error if required fields are missing', async () => {
            try {
                await userService.createUser({ name: 'John Doe', perfil: 'client', password: 'password123' });
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Todos os campos são obrigatórios');
            }
        });

        it('should throw error if cpf already exists', async () => {
            const mockData = { name: 'John Doe', cpf: '12345678901', perfil: 'client', password: 'password123' };
            sandbox.stub(bcrypt, 'hash').resolves('hashedPassword');
            sandbox.stub(User, 'create').rejects(new Error('SequelizeUniqueConstraintError: CPF já existe'));

            try {
                await userService.createUser(mockData);
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('SequelizeUniqueConstraintError: CPF já existe');
            }
        });
    });

    describe('updateUser', () => {
        it('should update a user and return it without password', async () => {
            const mockData = { name: 'John Updated', cpf: '12345678901', perfil: 'admin' };
            const mockUser = { id: 1, ...mockData, password: 'hashedPassword', update: sandbox.stub().resolves({ id: 1, ...mockData }) };
            sandbox.stub(User, 'findByPk').resolves(mockUser);

            const result = await userService.updateUser(1, mockData);

            expect(result).to.deep.equal({ id: 1, name: 'John Updated', cpf: '12345678901', perfil: 'admin' });
            expect(User.findByPk.calledWith(1)).to.be.true;
            expect(mockUser.update.calledWith(mockData)).to.be.true;
        });

        it('should throw error if user not found', async () => {
            sandbox.stub(User, 'findByPk').resolves(null);

            try {
                await userService.updateUser(1, { name: 'John Updated', cpf: '12345678901', perfil: 'admin' });
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Usuário não encontrado');
            }
        });

        it('should throw error if required fields are missing', async () => {
            const mockUser = { id: 1, name: 'John Doe', cpf: '12345678901', perfil: 'client', update: sandbox.stub() };
            sandbox.stub(User, 'findByPk').resolves(mockUser);

            try {
                await userService.updateUser(1, { name: 'John Updated' });
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Todos os campos são obrigatórios');
            }
        });
    });

    describe('deleteUser', () => {
        it('should delete a user successfully', async () => {
            const mockUser = { id: 1, name: 'John Doe', cpf: '12345678901', destroy: sandbox.stub().resolves() };
            sandbox.stub(User, 'findByPk').resolves(mockUser);

            await userService.deleteUser(1);

            expect(User.findByPk.calledWith(1)).to.be.true;
            expect(mockUser.destroy.calledOnce).to.be.true;
        });

        it('should throw error if user not found', async () => {
            sandbox.stub(User, 'findByPk').resolves(null);

            try {
                await userService.deleteUser(1);
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Usuário não encontrado');
            }
        });
    });
});