const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MAP_SLOT_POKEMON', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_MAP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MAPS',
        key: 'ID'
      }
    },
    ID_MAP_SLOT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MAP_SLOT',
        key: 'ID'
      }
    },
    ID_POKEMON: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'POKEMONS',
        key: 'ID'
      }
    },
    APPARITION_RATE: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MAP_SLOT_POKEMON',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__MAP_SLOT__3214EC27570FC902",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
