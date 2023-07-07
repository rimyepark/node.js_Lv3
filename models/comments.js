'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // 1. comments 모델에서
        this.belongsTo(models.users, { // 2. users 모델에게 N:1 관계 설정을 합니다.
          targetKey: 'User_id', // 3. users 모델의 UserId 컬럼을
          foreignKey: 'User_id', // 4. comment 모델의 UserId 컬럼과 연결합니다.
        });
  
        // 1. comments 모델에서
        this.belongsTo(models.posts, { // 2. post 모델에게 N:1 관계 설정을 합니다.
          targetKey: 'Post_id', // 3. post 모델의 PostId 컬럼을
          foreignKey: 'Post_id', // 4. comment 모델의 PostId 컬럼과 연결합니다.
        });
    }
  }
  comments.init({
    Comment_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    User_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'users',
        key:'User_id',
      },
      onDelete: 'CASCADE',
    },
    Post_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'posts',
        key:'Post_id',
      },
      onDelete: 'CASCADE',
    },
    comment: {
      allowNull: false,
      type: DataTypes.STRING
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
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};