const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Treatment extends Model {
    static associate(models) {
      Treatment.belongsTo(models.Pet, {
        foreignKey: 'petId',
        targetKey: 'id',
        as: 'Pet',
      });
    }
  }

  Treatment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'pet_id',
      references: {
        model: 'pets',
        key: 'id',
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Treatment',
    tableName: 'treatments',
    timestamps: false, // Desativar createdAt/updatedAt
  });

  return Treatment;
}