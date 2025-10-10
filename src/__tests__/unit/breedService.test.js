const sinon = require('sinon');
const { expect } = require('chai');
const breedService = require('../../services/breedService');
const Breed = require('../../models').Breed;

describe('Breed Service', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getAllBreeds', () => {
        it('should return all breeds', async () => {
            const mockBreeds = [
                { id: 1, description: 'Labrador' },
                { id: 2, description: 'Poodle' },
            ];
            sandbox.stub(Breed, 'findAll').resolves(mockBreeds);

            const result = await breedService.getAllBreeds();

            expect(result).to.deep.equal(mockBreeds);
            expect(Breed.findAll.calledOnce).to.be.true;
        });

        it('should return an empty array if no breeds are found', async () => {
            sandbox.stub(Breed, 'findAll').resolves([]);

            const result = await breedService.getAllBreeds();

            expect(result).to.deep.equal([]);
            expect(Breed.findAll.calledOnce).to.be.true;
        });

        it('should throw an error if findAll fails', async () => {
            const errorMessage = 'Database error';
            sandbox.stub(Breed, 'findAll').rejects(new Error(errorMessage));

            try {
                await breedService.getAllBreeds();
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal(errorMessage);
            }
        });
    });
});