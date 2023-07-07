'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsTo(models.Users, { 
          targetKey: 'user_id', 
          foreignKey: 'User_id',
        });
  
        // 1. Comments 모델에서
        this.belongsTo(models.Posts, { 
          targetKey: 'post_id', 
          foreignKey: 'Post_id', 
        });
    }
  }
Likes.init(
  {
    like_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'Users',
        key:'user_id',
      },
      onDelete: 'CASCADE',
    },
    post_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'Posts',
        key:'post_id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false, // NOT NULL
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false, // NOT NULL
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Likes',

  }
);return Likes;
};