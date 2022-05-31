'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type: Sequelize.INTEGER
      },
      username:{allowNull:false, type:Sequelize.STRING},
      password:{allowNull: false, type: Sequelize.STRING}
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("users");
  }
};
