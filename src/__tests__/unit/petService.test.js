const sinon = require('sinon');
const { expect } = require('chai');
const petService = require('../../services/petService');
const { Pet, Client, Breed } = require('../../models');

describe('Pet Service', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getAllPets', () => {
        it('should return pets for a client profile', async () => {
            const mockClient = { id: 1, name: 'John Doe', cpf: '12345678901' };
            const mockPets = [
                { id: 1, name: 'Rex', birthday: '2020-01-01', clientId: 1, Client: mockClient, Breed: { id: 1, description: 'Labrador' } },
            ];
            sandbox.stub(Client, 'findOne').resolves(mockClient);
            sandbox.stub(Pet, 'findAll').resolves(mockPets);

            const result = await petService.getAllPets('client', '12345678901');

            expect(result).to.deep.equal(mockPets);
            expect(Client.findOne.calledWith({ where: { cpf: '12345678901' } })).to.be.true;
            expect(Pet.findAll.calledWithMatch({
                where: { clientId: 1 },
                attributes: ['id', 'name', 'birthday'],
                include: [
                    { model: Client, as: 'Client' },
                    { model: Breed, as: 'Breed' },
                ],
            })).to.be.true;
        });

        it('should throw error if client not found for client profile', async () => {
            sandbox.stub(Client, 'findOne').resolves(null);

            try {
                await petService.getAllPets('client', '12345678901');
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Cliente não encontrado');
            }
        });

        it('should return all pets for non-client profile', async () => {
            const mockPets = [
                { id: 1, name: 'Rex', birthday: '2020-01-01', clientId: 1, Client: { id: 1, name: 'John Doe' }, Breed: { id: 1, description: 'Labrador' } },
                { id: 2, name: 'Luna', birthday: '2021-02-02', clientId: 2, Client: { id: 2, name: 'Jane Doe' }, Breed: { id: 2, description: 'Poodle' } },
            ];
            sandbox.stub(Pet, 'findAll').resolves(mockPets);

            const result = await petService.getAllPets('admin', null);

            expect(result).to.deep.equal(mockPets);
            expect(Pet.findAll.calledWithMatch({
                attributes: ['id', 'name', 'birthday'],
                include: [
                    { model: Client, as: 'Client' },
                    { model: Breed, as: 'Breed' },
                ],
            })).to.be.true;
        });

        it('should throw error if findAll fails', async () => {
            sandbox.stub(Pet, 'findAll').rejects(new Error('Database error'));

            try {
                await petService.getAllPets('admin', null);
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Database error');
            }
        });
    });

    describe('createPet', () => {
        it('should create a pet and return it', async () => {
            const mockData = { name: 'Rex', breedId: 1, clientId: 1 };
            const mockPet = { id: 1, ...mockData };
            sandbox.stub(Pet, 'create').resolves(mockPet);

            const result = await petService.createPet(mockData);

            expect(result).to.deep.equal(mockPet);
            expect(Pet.create.calledWith(mockData)).to.be.true;
        });

        it('should throw error if required fields are missing', async () => {
            try {
                await petService.createPet({ name: 'Rex', clientId: 1 });
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Todos os campos são obrigatórios');
            }
        });

        it('should throw error if breedId or clientId is invalid', async () => {
            const mockData = { name: 'Rex', breedId: 999, clientId: 1 };
            sandbox.stub(Pet, 'create').rejects(new Error('SequelizeForeignKeyConstraintError: Invalid breedId'));

            try {
                await petService.createPet(mockData);
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('SequelizeForeignKeyConstraintError: Invalid breedId');
            }
        });
    });

    describe('deletePet', () => {
        it('should delete a pet successfully', async () => {
            const mockPet = { id: 1, name: 'Rex', clientId: 1, breedId: 1, destroy: sandbox.stub().resolves() };
            sandbox.stub(Pet, 'findByPk').resolves(mockPet);

            await petService.deletePet(1);

            expect(Pet.findByPk.calledWith(1)).to.be.true;
            expect(mockPet.destroy.calledOnce).to.be.true;
        });

        it('should throw error if pet not found', async () => {
            sandbox.stub(Pet, 'findByPk').resolves(null);

            try {
                await petService.deletePet(1);
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Pet não encontrado');
            }
        });
    });
});