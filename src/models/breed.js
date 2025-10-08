const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Breed extends Model {
    static associate(models) {
      Breed.hasMany(models.Pet, {
        foreignKey: 'breedId',
        as: 'Pets',
      });
    }
  }

  Breed.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Breed',
    tableName: 'breeds',
    timestamps: false, // Desativar createdAt/updatedAt
  });

  return Breed;
};

