module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      MovieId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Movies',
          key: 'id',
        },
      },
      active: {
        type: Sequelize.BOOLEAN,
        defautValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rents');
  },
};
