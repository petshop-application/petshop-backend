const sinon = require('sinon');
const { expect } = require('chai');
const treatmentService = require('../../services/treatmentService');
const { Treatment, Pet, Client } = require('../../models');

describe('Treatment Service', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getAllTreatments', () => {
        it('should return treatments for a client profile', async () => {
            const mockPets = [
                { id: 1, name: 'Rex', clientId: 1, Client: { cpf: '12345678901' } },
            ];
            const mockTreatments = [
                { id: 1, description: 'Checkup', cost: 100.00, date: '2023-01-01', petId: 1, Pet: mockPets[0] },
            ];
            sandbox.stub(Pet, 'findAll').resolves(mockPets);
            sandbox.stub(Treatment, 'findAll').resolves(mockTreatments);

            const result = await treatmentService.getAllTreatments('client', '12345678901');

            expect(result).to.deep.equal(mockTreatments);
            expect(Pet.findAll.calledWithMatch({
                where: { '$Client.cpf$': '12345678901' },
                include: [{ model: Client, as: 'Client', attributes: [] }],
            })).to.be.true;
            expect(Treatment.findAll.calledWithMatch({
                where: { petId: [1] },
                attributes: ['id', 'description', 'cost', 'date'],
                include: [{ model: Pet, as: 'Pet' }],
            })).to.be.true;
        });

        it('should throw error if no pets found for client profile', async () => {
            sandbox.stub(Pet, 'findAll').resolves([]);

            try {
                await treatmentService.getAllTreatments('client', '12345678901');
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Pet não encontrado');
            }
        });

        it('should return all treatments for non-client profile', async () => {
            const mockTreatments = [
                { id: 1, description: 'Checkup', cost: 100.00, date: '2023-01-01', petId: 1, Pet: { id: 1, name: 'Rex' } },
                { id: 2, description: 'Vaccination', cost: 50.00, date: '2023-02-01', petId: 2, Pet: { id: 2, name: 'Luna' } },
            ];
            sandbox.stub(Treatment, 'findAll').resolves(mockTreatments);

            const result = await treatmentService.getAllTreatments('admin', null);

            expect(result).to.deep.equal(mockTreatments);
            expect(Treatment.findAll.calledWithMatch({
                attributes: ['id', 'description', 'cost', 'date'],
                include: [{ model: Pet, as: 'Pet' }],
            })).to.be.true;
        });

        it('should throw error if findAll fails', async () => {
            sandbox.stub(Treatment, 'findAll').rejects(new Error('Database error'));

            try {
                await treatmentService.getAllTreatments('admin', null);
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Database error');
            }
        });
    });

    describe('createTreatment', () => {
        it('should create a treatment and return it', async () => {
            const mockData = { petId: 1, date: '2023-01-01', description: 'Checkup', cost: 100.00 };
            const mockTreatment = { id: 1, ...mockData };
            sandbox.stub(Treatment, 'create').resolves(mockTreatment);

            const result = await treatmentService.createTreatment(mockData);

            expect(result).to.deep.equal(mockTreatment);
            expect(Treatment.create.calledWith(mockData)).to.be.true;
        });

        it('should throw error if required fields are missing', async () => {
            try {
                await treatmentService.createTreatment({ petId: 1 });
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Todos os campos são obrigatórios');
            }
        });

        it('should throw error if petId is invalid', async () => {
            const mockData = { petId: 999, date: '2023-01-01' };
            sandbox.stub(Treatment, 'create').rejects(new Error('SequelizeForeignKeyConstraintError: Invalid petId'));

            try {
                await treatmentService.createTreatment(mockData);
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('SequelizeForeignKeyConstraintError: Invalid petId');
            }
        });
    });

    describe('deleteTreatment', () => {
        it('should delete a treatment successfully', async () => {
            const mockTreatment = { id: 1, petId: 1, description: 'Checkup', destroy: sandbox.stub().resolves() };
            sandbox.stub(Treatment, 'findByPk').resolves(mockTreatment);

            await treatmentService.deleteTreatment(1);

            expect(Treatment.findByPk.calledWith(1)).to.be.true;
            expect(mockTreatment.destroy.calledOnce).to.be.true;
        });

        it('should throw error if treatment not found', async () => {
            sandbox.stub(Treatment, 'findByPk').resolves(null);

            try {
                await treatmentService.deleteTreatment(1);
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Atendimento não encontrado');
            }
        });
    });
});