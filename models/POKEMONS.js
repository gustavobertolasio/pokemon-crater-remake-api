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
    },
    IS_INITIAL: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    HP: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    ATTACK: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    DEFENSE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    SPECIAL_ATTACK: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    SPECIAL_DEFENSE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    SPEED: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    ID_GROWTH_RATE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'GROWTH_RATE',
        key: 'ID'
      }
    },
    CATCH_RATE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    BACK_SPRITE: {
      type: DataTypes.STRING(255),
      allowNull: true
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
