'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Data.init({
    userId: DataTypes.INTEGER,
    atLike: DataTypes.INTEGER,
    region: DataTypes.STRING,
    text: DataTypes.TEXT,
    photo: DataTypes.STRING,
    tag1: DataTypes.STRING,
    tag2: DataTypes.STRING,
    tag3: DataTypes.STRING,
    tag4: DataTypes.STRING,
    tag5: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Data',
  });
  return Data;
};