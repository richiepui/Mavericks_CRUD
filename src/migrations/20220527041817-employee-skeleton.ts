'use strict';

import { QueryInterface } from "sequelize";
import { Sequelize, DataType} from "sequelize-typescript";

module.exports = {
  async up (queryInterface:QueryInterface, Sequelize:Sequelize) {
    return queryInterface.createTable("employees", {
      id : {
        allowNull:false,
        autoIncrement:true,
        primaryKey: true, 
        type: DataType.INTEGER
      },
      name:{allowNull:false, type: DataType.STRING},
      salary:{allowNull:false, type: DataType.INTEGER},
      department:{type: DataType.STRING}
    })
  },

  async down (queryInterface:QueryInterface, Sequelize:Sequelize) {
    queryInterface.dropTable("employees");
  }
};
