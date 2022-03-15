'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  User.init({
    userName: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique:true},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'User'},
    password: {type: DataTypes.STRING, allowNull: false},
    isActivated:{type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    activationLink:{type:DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};