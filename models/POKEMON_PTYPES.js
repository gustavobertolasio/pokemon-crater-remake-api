const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('POKEMON_PTYPES', {
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
    ID_TYPE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PTYPE',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'POKEMON_PTYPES',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__POKEMON___3214EC279834BB84",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
