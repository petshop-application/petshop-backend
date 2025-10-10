const sinon = require('sinon');
const { expect } = require('chai');
const clientService = require('../../services/clientService');
const Client = require('../../models').Client;

describe('Client Service', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getAllClients', () => {
        it('should return a single client for "client" profile', async () => {
            const mockClient = { id: 1, name: 'John Doe', cpf: '12345678901' };
            sandbox.stub(Client, 'findOne').resolves(mockClient);

            const result = await clientService.getAllClients('client', '12345678901');

            expect(result).to.deep.equal([mockClient]);
            expect(Client.findOne.calledWith({ where: { cpf: '12345678901' } })).to.be.true;
        });

        it('should throw error if client not found for "client" profile', async () => {
            sandbox.stub(Client, 'findOne').resolves(null);

            try {
                await clientService.getAllClients('client', '12345678901');
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Cliente não encontrado');
            }
        });

        it('should return all clients for non-"client" profile', async () => {
            const mockClients = [
                { id: 1, name: 'John Doe', cpf: '12345678901' },
                { id: 2, name: 'Jane Doe', cpf: '98765432109' },
            ];
            sandbox.stub(Client, 'findAll').resolves(mockClients);

            const result = await clientService.getAllClients('admin', null);

            expect(result).to.deep.equal(mockClients);
            expect(Client.findAll.calledOnce).to.be.true;
        });
    });

    describe('createClient', () => {
        it('should create a client and return it', async () => {
            const mockData = { name: 'John Doe', cpf: '12345678901' };
            const mockClient = { id: 1, ...mockData, createdAt: new Date() };
            sandbox.stub(Client, 'create').resolves(mockClient);

            const result = await clientService.createClient(mockData);

            expect(result).to.deep.equal(mockClient);
            expect(Client.create.calledWith({
                name: 'John Doe',
                cpf: '12345678901',
                createdAt: sinon.match.any,
            })).to.be.true;
        });

        it('should throw error if name or cpf is missing', async () => {
            try {
                await clientService.createClient({ name: 'John Doe' });
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Todos os campos são obrigatórios');
            }
        });

        it('should throw error if cpf already exists', async () => {
            const mockData = { name: 'John Doe', cpf: '12345678901' };
            sandbox.stub(Client, 'create').rejects(new Error('SequelizeUniqueConstraintError: CPF já existe'));

            try {
                await clientService.createClient(mockData);
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('SequelizeUniqueConstraintError: CPF já existe');
            }
        });
    });

    describe('deleteClient', () => {
        it('should delete a client successfully', async () => {
            const mockClient = { id: 1, name: 'John Doe', cpf: '12345678901', destroy: sinon.stub().resolves() };
            sandbox.stub(Client, 'findByPk').resolves(mockClient);

            await clientService.deleteClient(1);

            expect(Client.findByPk.calledWith(1)).to.be.true;
            expect(mockClient.destroy.calledOnce).to.be.true;
        });

        it('should throw error if client not found', async () => {
            sandbox.stub(Client, 'findByPk').resolves(null);

            try {
                await clientService.deleteClient(1);
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Cliente não encontrado');
            }
        });
    });
});