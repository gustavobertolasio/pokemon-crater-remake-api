const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('POKEMON_MOVES', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_GENERATED_POKEMON: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'GENERATED_POKEMON',
        key: 'ID'
      }
    },
    ID_MOVE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MOVES',
        key: 'ID'
      }
    },
    CURRENT_PP: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'POKEMON_MOVES',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__POKEMON___3214EC27AF1EF91D",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
