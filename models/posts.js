'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, { // 2. users 모델에게 N:1 관계 설정을 합니다.
        targetKey: 'User_id', // 3. users 모델의 UserId 컬럼을
        foreignKey: 'User_id', // 4. posts 모델의 UserId 컬럼과 연결합니다.
      });

      // 1. post 모델에서
      this.hasMany(models.comments, { // 2. comments 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'Post_id', // 3. posts 모델의 Post_id 컬럼을
        foreignKey: 'Post_id', // 4. comments 모델의 PostId 컬럼과 연결합니다.
      });
    }
  }
  posts.init({
      Post_id: {
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
    title: {    
      allowNull: false,
    type: DataTypes.STRING
  },
    content:{    
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
    modelName: 'posts',
  });
  return posts;
};