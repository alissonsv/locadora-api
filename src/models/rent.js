const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {}
  Rent.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      MovieId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Movies',
          key: 'id',
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Rent',
    }
  );
  return Rent;
};
