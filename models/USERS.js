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
      allowNull: false
    },
    POKEDEX_FOUND: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    VICTORIES: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    LOSSES: {
      type: DataTypes.INTEGER,
      allowNull: false
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
