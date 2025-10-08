const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      Client.hasOne(models.Address, {
        foreignKey: 'clientId',
        targetKey: 'id',
        as: 'Address',
      });
      Client.hasMany(models.Pet, {
        foreignKey: 'clientId',
        targetKey: 'id',
        as: 'Pet',
      });
    }
  }

  Client.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
    timestamps: false, // Desativar createdAt/updatedAt
  });

  return Client;

};
