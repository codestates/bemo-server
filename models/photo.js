'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Photo.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id'
      })

      Photo.hasMany(models.Comment, {
        foreignKey: 'photoId',
        constraints: false
      })

      Photo.hasMany(models.Like, {
        foreignKey: 'photoId',
        constraints: false
      })

      Photo.hasMany(models.Hashtag, {
        foreignKey: 'photoId',
        constraints: false
      })
    }
  };

  Photo.init({
    userId: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    text: DataTypes.STRING,
    region: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};