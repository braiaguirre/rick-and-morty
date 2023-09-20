const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Favorite', {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      status: {
         type: DataType.ENUM('Alive', 'Dead', 'unknown'),
         allowNull: false
      },
      species: {
         type: DataType.STRING,
         allowNull: false
      },
      gender: {
         type: DataType.ENUM('Female', 'Male', 'Genderless', 'unknown'),
         allowNull: false
      },
      origin: {
         type: DataType.STRING,
         allowNull: false
      },
      image: {
         type: DataType.STRING,
         allowNull: false
      }
   }, { timestamps: false });
};
