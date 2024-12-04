const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('POKEMON_LEARNSET', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_POKEMON: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'POKEMONS',
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
    LEARN_LEVEL: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'POKEMON_LEARNSET',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__POKEMON___3214EC2773FA5CCB",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
