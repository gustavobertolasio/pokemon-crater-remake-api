const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('POKEMONS', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    POKEMON_NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    DEFAULT_SPRITE: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'POKEMONS',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__POKEMONS__3214EC27D9E0DF42",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
