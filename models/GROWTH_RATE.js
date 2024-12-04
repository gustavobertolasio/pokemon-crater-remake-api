const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('GROWTH_RATE', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    GROWTH_TYPE: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    GROWTH_ACRONYM: {
      type: DataTypes.STRING(4),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'GROWTH_RATE',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__GROWTH_R__3214EC271D2AC65B",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
