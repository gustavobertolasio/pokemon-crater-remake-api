const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PTYPE', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TYPENAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PTYPE',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__PTYPE__3214EC27216BE46A",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
