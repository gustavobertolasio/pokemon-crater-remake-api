const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USERS', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    USERNAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TRAINER: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    REGION: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    AGE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    POKEDEX_CAPTURED: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    POKEDEX_FOUND: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    VICTORIES: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    LOSSES: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    PASSWORD: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "((0))"
    }
  }, {
    sequelize,
    tableName: 'USERS',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__USERS__3214EC2776F37475",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
