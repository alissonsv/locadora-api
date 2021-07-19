const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.Rent,
      });
    }

    toJSON() {
      const movie = this.get({ plain: true });
      delete movie.createdAt;
      delete movie.updatedAt;

      return movie;
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      director: DataTypes.STRING,
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      available: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Movie',
    }
  );
  return Movie;
};
