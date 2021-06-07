const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TEAM_TRAINER', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SLOT_NUMBER: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'TEAM_TRAINER',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TEAM_TRA__3214EC27C5AE859F",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
