'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.User, {
        foreignKey: 'userId'
      })

      Like.belongsTo(models.Photo, {
        foreignKey: 'photoId'
      })
    }
  };

  Like.init({
    userId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER,
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};