'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.hasMany(models.posts, { // 2. posts 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'User_id', // 3. user 모델의 User_Id 컬럼을
        foreignKey: 'User_id', // 4. post 모델의 User_Id 컬럼과 연결합니다.
      });
    }
  }

  users.init({
    User_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    login_id: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    nickname: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    myphoto: {
      allowNull: true,
      type: DataTypes.STRING
    },
    mySNS: {
      allowNull: true,
      type: DataTypes.STRING
    },
    introduction: {
      allowNull: true,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};