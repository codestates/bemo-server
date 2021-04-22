'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo_hashtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Photo_hashtag.belongsTo(models.Photo, {
        foreignKey: 'photoId'
      })

      Photo_hashtag.belongsTo(models.Hashtag, {
        foreignKey: 'tagId'
      })
    }
  };

  Photo_hashtag.init({
    tagId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo_hashtag',
  });
  return Photo_hashtag;
};