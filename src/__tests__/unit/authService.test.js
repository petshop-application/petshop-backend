const sinon = require('sinon');
const { expect } = require('chai');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../../services/authService');
const { User } = require('../../models');

describe('Auth Service', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('login', () => {
        it('should login successfully and return token and user info', async () => {
            const mockData = { cpf: '12345678901', password: 'password123' };
            const mockUser = { id: 1, name: 'John Doe', cpf: '12345678901', perfil: 'client', password: 'hashedPassword' };
            const mockToken = 'mocked-jwt-token';
            sandbox.stub(User, 'findOne').resolves(mockUser);
            sandbox.stub(bcrypt, 'compare').resolves(true);
            sandbox.stub(jwt, 'sign').returns(mockToken);

            const result = await authService.login(mockData);

            expect(result).to.deep.equal({
                success: true,
                data: {
                    token: mockToken,
                    user: { id: 1, name: 'John Doe', perfil: 'client', cpf: '12345678901' },
                },
                error: null,
            });
            expect(User.findOne.calledWith({ where: { cpf: '12345678901' } })).to.be.true;
            expect(bcrypt.compare.calledWith('password123', 'hashedPassword')).to.be.true;
            expect(jwt.sign.calledWith(
                { id: 1, cpf: '12345678901', perfil: 'client' },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )).to.be.true;
        });

        it('should return error if CPF is missing', async () => {
            const result = await authService.login({ password: 'password123' });

            expect(result).to.deep.equal({
                success: false,
                data: null,
                error: 'CPF e senha são obrigatórios',
            });
        });

        it('should return error if password is missing', async () => {
            const result = await authService.login({ cpf: '12345678901' });

            expect(result).to.deep.equal({
                success: false,
                data: null,
                error: 'CPF e senha são obrigatórios',
            });
        });

        it('should return error if user not found', async () => {
            sandbox.stub(User, 'findOne').resolves(null);

            const result = await authService.login({ cpf: '12345678901', password: 'password123' });

            expect(result).to.deep.equal({
                success: false,
                data: null,
                error: 'Usuário não encontrado',
            });
        });

        it('should return error if password is invalid', async () => {
            const mockUser = { id: 1, name: 'John Doe', cpf: '12345678901', perfil: 'client', password: 'hashedPassword' };
            sandbox.stub(User, 'findOne').resolves(mockUser);
            sandbox.stub(bcrypt, 'compare').resolves(false);

            const result = await authService.login({ cpf: '12345678901', password: 'wrongPassword' });

            expect(result).to.deep.equal({
                success: false,
                data: null,
                error: 'Credenciais inválidas',
            });
        });

        it('should return error if bcrypt.compare fails', async () => {
            const mockUser = { id: 1, name: 'John Doe', cpf: '12345678901', perfil: 'client', password: 'hashedPassword' };
            sandbox.stub(User, 'findOne').resolves(mockUser);
            sandbox.stub(bcrypt, 'compare').rejects(new Error('Bcrypt error'));

            const result = await authService.login({ cpf: '12345678901', password: 'password123' });

            expect(result).to.deep.equal({
                success: false,
                data: null,
                error: 'Bcrypt error',
            });
        });
    });

    describe('getUserInfo', () => {
        it('should return user info by ID', async () => {
            const mockUser = { id: 1, name: 'John Doe', perfil: 'client', cpf: '12345678901' };
            sandbox.stub(User, 'findByPk').resolves(mockUser);

            const result = await authService.getUserInfo(1);

            expect(result).to.deep.equal(mockUser);
            expect(User.findByPk.calledWith(1, {
                attributes: ['id', 'name', 'perfil', 'cpf'],
            })).to.be.true;
        });

        it('should return null if user not found', async () => {
            sandbox.stub(User, 'findByPk').resolves(null);

            const result = await authService.getUserInfo(1);

            expect(result).to.be.null;
            expect(User.findByPk.calledWith(1)).to.be.true;
        });

        it('should throw error if findByPk fails', async () => {
            sandbox.stub(User, 'findByPk').rejects(new Error('Database error'));

            try {
                await authService.getUserInfo(1);
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Database error');
            }
        });
    });
});