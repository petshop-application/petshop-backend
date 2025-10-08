const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      Pet.belongsTo(models.Client, {
        foreignKey: 'clientId',
        targetKey: 'id',
        as: 'Client'
      });
      Pet.belongsTo(models.Breed, {
        foreignKey: 'breedId',
        targetKey: 'id',
        as: 'Breed'
      });
    }
  }

  Pet.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'client_id',
      references: {
        model: 'clients',
        key: 'id',
      },
    },
    breedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'breed_id',
      references: {
        model: 'breeds',
        key: 'id',
      },
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Pet',
    tableName: 'pets',
    timestamps: false, // Desativar createdAt/updatedAt
  });

  return Pet;
}