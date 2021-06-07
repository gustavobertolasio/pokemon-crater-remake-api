const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "POKEMON_TRAINER",
    {
      ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ID_POKEMON: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "POKEMONS",
          key: "ID",
        },
      },
      ID_TRAINER: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "USERS",
          key: "ID",
        },
      },
    },
    {
      sequelize,
      tableName: "POKEMON_TRAINER",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "PK__POKEMON___3214EC27C0BC1A2B",
          unique: true,
          fields: [{ name: "ID" }],
        },
      ],
    }
  );
};
