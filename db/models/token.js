'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasOne(this)
      this.belongsTo(models.User)
    }
  }
  Token.init({
    refreshToken: { type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};