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
    HP_IV: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    SPECIAL_DEFENSE_IV: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    ALL_STATUS_IV: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    EV_HP: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    EV_ATTACK: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    EV_DEFENSE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    EV_SPECIAL_ATTACK: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    EV_SPECIAL_DEFENSE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    EV_SPEED: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    CURRENT_HP: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    POKEMON_LEVEL: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    CURRENT_XP: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    XP_NEXT_LEVEL: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
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
