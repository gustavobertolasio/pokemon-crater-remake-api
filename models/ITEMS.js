const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ITEMS', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ITEM_NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ITEMS',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__ITEMS__3214EC279449033C",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
