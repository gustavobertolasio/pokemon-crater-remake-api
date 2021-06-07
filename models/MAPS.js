const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MAPS', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MAP_ARCHIVE_NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    MAP_WIDTH: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    MAP_HEIGHT: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MAPS',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__MAPS__3214EC27EE0BBE9F",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
