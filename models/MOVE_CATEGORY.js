const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MOVE_CATEGORY', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CATEGORY_NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MOVE_CATEGORY',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__MOVE_CAT__3214EC270B5265F8",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
