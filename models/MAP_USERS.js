const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MAP_USERS', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ID_MAP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MAPS',
        key: 'ID'
      }
    },
    PLAYER_SLOT: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ID_TRAINER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'USERS',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'MAP_USERS',
    schema: 'dbo',
    timestamps: false
  });
};
