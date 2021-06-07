const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('GENERATED_POKEMON', {
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
    }
  }, {
    sequelize,
    tableName: 'GENERATED_POKEMON',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__GENERATE__3214EC272EB8866E",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
