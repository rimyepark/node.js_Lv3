'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      Comment_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      User_Id: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // users 모델을 참조합니다.
          key: 'User_Id', // users 모델의 User_Id를 참조합니다.
        },
        onDelete: 'CASCADE', // 만약 users 모델의 User_Id가 삭제되면, profiles 모델의 데이터가 삭제됩니다.
      },
      Post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'posts', 
          key: 'Post_Id', 
        },
        onDelete: 'CASCADE',
      },
      comment: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};