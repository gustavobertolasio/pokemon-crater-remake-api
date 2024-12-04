const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MOVES', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SKILL_NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ID_PTYPE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PTYPE',
        key: 'ID'
      }
    },
    ID_CATEGORY: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MOVE_CATEGORY',
        key: 'ID'
      }
    },
    MAX_PP: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SKILL_POWER: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ACCURACY: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MOVES',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__MOVES__3214EC2799817123",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
