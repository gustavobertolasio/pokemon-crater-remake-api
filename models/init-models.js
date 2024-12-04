// TODO: Refactor init-models


var DataTypes = require("sequelize").DataTypes;
var _BAG_TRAINER = require("./BAG_TRAINER");
var _ITEMS = require("./ITEMS");
var _TEAM_TRAINER = require("./TEAM_TRAINER");
var _USERS = require("./USERS");

var _GENERATED_POKEMON = require("./GENERATED_POKEMON");
var _GENERATED_POKEMON_TRAINER = require("./GENERATED_POKEMON_TRAINER");
var _POKEMONS = require("./POKEMONS");
var _POKEMON_PTYPES = require("./POKEMON_PTYPES");
var _PTYPE = require("./PTYPE");
var _GROWTH_RATE = require("./GROWTH_RATE");

var _MAPS = require("./MAPS");
var _MAP_USERS = require("./MAP_USERS");
var _MAP_SLOT = require("./MAP_SLOT");
var _MAP_SLOT_POKEMON = require("./MAP_SLOT_POKEMON");

var _MOVES = require("./MOVES");
var _POKEMON_MOVES = require("./POKEMON_MOVES");
var _MOVE_CATEGORY = require("./MOVE_CATEGORY");
var _POKEBALL = require("./POKEBALL");
var _POKEMON_LEARNSET = require("./POKEMON_LEARNSET");
var _POKEMON_TRAINER = require("./POKEMON_TRAINER");

function initModels(sequelize) {
  var USERS = _USERS(sequelize, DataTypes);
  var ITEMS = _ITEMS(sequelize, DataTypes);
  var MAPS = _MAPS(sequelize, DataTypes);
  var POKEMONS = _POKEMONS(sequelize, DataTypes);
  var PTYPE = _PTYPE(sequelize, DataTypes);

  var BAG_TRAINER = _BAG_TRAINER(sequelize, DataTypes);
  var GENERATED_POKEMON = _GENERATED_POKEMON(sequelize, DataTypes);
  var GENERATED_POKEMON_TRAINER = _GENERATED_POKEMON_TRAINER(
    sequelize,
    DataTypes
  );
  var MAP_SLOT = _MAP_SLOT(sequelize, DataTypes);
  var MAP_SLOT_POKEMON = _MAP_SLOT_POKEMON(sequelize, DataTypes);
  var POKEMON_PTYPES = _POKEMON_PTYPES(sequelize, DataTypes);
  var TEAM_TRAINER = _TEAM_TRAINER(sequelize, DataTypes);

  var GROWTH_RATE = _GROWTH_RATE(sequelize, DataTypes);
  var MAP_USERS = _MAP_USERS(sequelize, DataTypes);
  var MOVES = _MOVES(sequelize, DataTypes);
  var POKEMON_MOVES = _POKEMON_MOVES(sequelize, DataTypes);
  var MOVE_CATEGORY = _MOVE_CATEGORY(sequelize, DataTypes);
  var POKEBALL = _POKEBALL(sequelize, DataTypes);
  var POKEMON_LEARNSET = _POKEMON_LEARNSET(sequelize, DataTypes);
  var POKEMON_TRAINER = _POKEMON_TRAINER(sequelize, DataTypes);

  USERS.sync();
  ITEMS.sync();
  MAPS.sync();
  POKEMONS.sync();
  MOVES.sync();
  POKEBALL.sync();
  PTYPE.sync();
  BAG_TRAINER.sync();
  GENERATED_POKEMON.sync();
  GENERATED_POKEMON_TRAINER.sync();
  MAP_SLOT.sync();
  MAP_SLOT_POKEMON.sync();
  POKEMON_PTYPES.sync();
  TEAM_TRAINER.sync();
  GROWTH_RATE.sync();
  MAP_USERS.sync();
  POKEMON_MOVES.sync();
  MOVE_CATEGORY.sync();
  POKEMON_LEARNSET.sync();
  POKEMON_TRAINER.sync();

  GENERATED_POKEMON_TRAINER.belongsTo(GENERATED_POKEMON, {
    as: "ID_GENERATED_POKEMON_GENERATED_POKEMON",
    foreignKey: "ID_GENERATED_POKEMON",
  });
  GENERATED_POKEMON.hasMany(GENERATED_POKEMON_TRAINER, {
    as: "GENERATED_POKEMON_TRAINERs",
    foreignKey: "ID_GENERATED_POKEMON",
  });
  TEAM_TRAINER.belongsTo(GENERATED_POKEMON, {
    as: "ID_GENERATED_POKEMON_GENERATED_POKEMON",
    foreignKey: "ID_GENERATED_POKEMON",
  });
  GENERATED_POKEMON.hasMany(TEAM_TRAINER, {
    as: "TEAM_TRAINERs",
    foreignKey: "ID_GENERATED_POKEMON",
  });
  BAG_TRAINER.belongsTo(ITEMS, { as: "ID_ITEM_ITEM", foreignKey: "ID_ITEM" });
  ITEMS.hasMany(BAG_TRAINER, { as: "BAG_TRAINERs", foreignKey: "ID_ITEM" });
  MAP_SLOT.belongsTo(MAPS, { as: "ID_MAP_MAP", foreignKey: "ID_MAP" });
  MAPS.hasMany(MAP_SLOT, { as: "MAP_SLOTs", foreignKey: "ID_MAP" });
  MAP_SLOT_POKEMON.belongsTo(MAPS, { as: "ID_MAP_MAP", foreignKey: "ID_MAP" });
  MAPS.hasMany(MAP_SLOT_POKEMON, {
    as: "MAP_SLOT_POKEMONs",
    foreignKey: "ID_MAP",
  });
  MAP_SLOT_POKEMON.belongsTo(MAP_SLOT, {
    as: "ID_MAP_SLOT_MAP_SLOT",
    foreignKey: "ID_MAP_SLOT",
  });
  MAP_SLOT.hasMany(MAP_SLOT_POKEMON, {
    as: "MAP_SLOT_POKEMONs",
    foreignKey: "ID_MAP_SLOT",
  });
  GENERATED_POKEMON.belongsTo(POKEMONS, {
    as: "ID_POKEMON_POKEMON",
    foreignKey: "ID_POKEMON",
  });
  POKEMONS.hasMany(GENERATED_POKEMON, {
    as: "GENERATED_POKEMONs",
    foreignKey: "ID_POKEMON",
  });
  MAP_SLOT_POKEMON.belongsTo(POKEMONS, {
    as: "ID_POKEMON_POKEMON",
    foreignKey: "ID_POKEMON",
  });
  POKEMONS.hasMany(MAP_SLOT_POKEMON, {
    as: "MAP_SLOT_POKEMONs",
    foreignKey: "ID_POKEMON",
  });
  POKEMON_PTYPES.belongsTo(POKEMONS, {
    as: "ID_POKEMON_POKEMON",
    foreignKey: "ID_POKEMON",
  });
  POKEMONS.hasMany(POKEMON_PTYPES, {
    as: "POKEMON_PTYPEs",
    foreignKey: "ID_POKEMON",
  });
  POKEMON_PTYPES.belongsTo(PTYPE, {
    as: "ID_TYPE_PTYPE",
    foreignKey: "ID_TYPE",
  });
  PTYPE.hasMany(POKEMON_PTYPES, {
    as: "POKEMON_PTYPEs",
    foreignKey: "ID_TYPE",
  });
  GENERATED_POKEMON_TRAINER.belongsTo(USERS, {
    as: "ID_TRAINER_USER",
    foreignKey: "ID_TRAINER",
  });
  USERS.hasMany(GENERATED_POKEMON_TRAINER, {
    as: "GENERATED_POKEMON_TRAINERs",
    foreignKey: "ID_TRAINER",
  });
  TEAM_TRAINER.belongsTo(USERS, {
    as: "ID_TRAINER_USER",
    foreignKey: "ID_TRAINER",
  });
  USERS.hasMany(TEAM_TRAINER, {
    as: "TEAM_TRAINERs",
    foreignKey: "ID_TRAINER",
  });

  return {
    BAG_TRAINER,
    GENERATED_POKEMON,
    GENERATED_POKEMON_TRAINER,
    ITEMS,
    MAPS,
    MAP_SLOT,
    MAP_SLOT_POKEMON,
    POKEMONS,
    POKEMON_PTYPES,
    PTYPE,
    TEAM_TRAINER,
    USERS,
    GROWTH_RATE,
    MAP_USERS,
    MOVES,
    POKEMON_MOVES,
    MOVE_CATEGORY,
    POKEMON_LEARNSET,
    POKEMON_TRAINER,
    POKEBALL
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
