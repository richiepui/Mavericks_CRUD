'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("employees", {
      id : {
        allowNull:false,
        autoIncrement:true,
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      name:{allowNull:false, type: Sequelize.STRING},
      salary:{allowNull:false, type: Sequelize.INTEGER},
      department:{type: Sequelize.STRING}
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("employees");
  }
};
