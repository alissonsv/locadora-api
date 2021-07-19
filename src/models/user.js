const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Movie, {
        through: models.Rent,
      });
    }

    toJSON() {
      const user = this.get({ plain: true });
      delete user.password;
      delete user.tokens;
      delete user.createdAt;
      delete user.updatedAt;

      return user;
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tokens: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
    },
    {
      hooks: {
        beforeSave: async (user) => {
          if (user.changed('password')) {
            // eslint-disable-next-line no-param-reassign
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
