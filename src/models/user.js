const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      tokens: DataTypes.ARRAY(DataTypes.STRING),
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
