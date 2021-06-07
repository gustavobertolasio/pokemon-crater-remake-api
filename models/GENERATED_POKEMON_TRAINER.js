const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('GENERATED_POKEMON_TRAINER', {
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
    ID_TRAINER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'USERS',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'GENERATED_POKEMON_TRAINER',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__GENERATE__3214EC27B3FF1184",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
