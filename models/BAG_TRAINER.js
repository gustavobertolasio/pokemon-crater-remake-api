const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BAG_TRAINER', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_TRAINER: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ID_ITEM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ITEMS',
        key: 'ID'
      }
    },
    QTD_ITEM: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'BAG_TRAINER',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__BAG_TRAI__3214EC27E63BA481",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
