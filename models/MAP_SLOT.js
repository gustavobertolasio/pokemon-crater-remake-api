const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MAP_SLOT', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_MAP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MAPS',
        key: 'ID'
      }
    },
    CAN_ACCESS: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MAP_SLOT',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__MAP_SLOT__3214EC276B532138",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
