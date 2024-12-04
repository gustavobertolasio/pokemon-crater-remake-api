const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('POKEBALL', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_ITEM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ITEMS',
        key: 'ID'
      }
    },
    CATCH_RATE: {
      type: DataTypes.DECIMAL(2,1),
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'POKEBALL',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__POKEBALL__3214EC270DF76189",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
