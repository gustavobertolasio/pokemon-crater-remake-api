var DataTypes = require("sequelize").DataTypes;
var _BAG_TRAINER = require("./BAG_TRAINER");
var _GENERATED_POKEMON = require("./GENERATED_POKEMON");
var _GENERATED_POKEMON_TRAINER = require("./GENERATED_POKEMON_TRAINER");
var _ITEMS = require("./ITEMS");
var _MAPS = require("./MAPS");
var _MAP_SLOT = require("./MAP_SLOT");
var _MAP_SLOT_POKEMON = require("./MAP_SLOT_POKEMON");
var _POKEMONS = require("./POKEMONS");
var _POKEMON_PTYPES = require("./POKEMON_PTYPES");
var _PTYPE = require("./PTYPE");
var _TEAM_TRAINER = require("./TEAM_TRAINER");
var _USERS = require("./USERS");

function initModels(sequelize) {
  var BAG_TRAINER = _BAG_TRAINER(sequelize, DataTypes);
  var GENERATED_POKEMON = _GENERATED_POKEMON(sequelize, DataTypes);
  var GENERATED_POKEMON_TRAINER = _GENERATED_POKEMON_TRAINER(sequelize, DataTypes);
  var ITEMS = _ITEMS(sequelize, DataTypes);
  var MAPS = _MAPS(sequelize, DataTypes);
  var MAP_SLOT = _MAP_SLOT(sequelize, DataTypes);
  var MAP_SLOT_POKEMON = _MAP_SLOT_POKEMON(sequelize, DataTypes);
  var POKEMONS = _POKEMONS(sequelize, DataTypes);
  var POKEMON_PTYPES = _POKEMON_PTYPES(sequelize, DataTypes);
  var PTYPE = _PTYPE(sequelize, DataTypes);
  var TEAM_TRAINER = _TEAM_TRAINER(sequelize, DataTypes);
  var USERS = _USERS(sequelize, DataTypes);

  GENERATED_POKEMON_TRAINER.belongsTo(GENERATED_POKEMON, { as: "ID_GENERATED_POKEMON_GENERATED_POKEMON", foreignKey: "ID_GENERATED_POKEMON"});
  GENERATED_POKEMON.hasMany(GENERATED_POKEMON_TRAINER, { as: "GENERATED_POKEMON_TRAINERs", foreignKey: "ID_GENERATED_POKEMON"});
  TEAM_TRAINER.belongsTo(GENERATED_POKEMON, { as: "ID_GENERATED_POKEMON_GENERATED_POKEMON", foreignKey: "ID_GENERATED_POKEMON"});
  GENERATED_POKEMON.hasMany(TEAM_TRAINER, { as: "TEAM_TRAINERs", foreignKey: "ID_GENERATED_POKEMON"});
  BAG_TRAINER.belongsTo(ITEMS, { as: "ID_ITEM_ITEM", foreignKey: "ID_ITEM"});
  ITEMS.hasMany(BAG_TRAINER, { as: "BAG_TRAINERs", foreignKey: "ID_ITEM"});
  MAP_SLOT.belongsTo(MAPS, { as: "ID_MAP_MAP", foreignKey: "ID_MAP"});
  MAPS.hasMany(MAP_SLOT, { as: "MAP_SLOTs", foreignKey: "ID_MAP"});
  MAP_SLOT_POKEMON.belongsTo(MAPS, { as: "ID_MAP_MAP", foreignKey: "ID_MAP"});
  MAPS.hasMany(MAP_SLOT_POKEMON, { as: "MAP_SLOT_POKEMONs", foreignKey: "ID_MAP"});
  MAP_SLOT_POKEMON.belongsTo(MAP_SLOT, { as: "ID_MAP_SLOT_MAP_SLOT", foreignKey: "ID_MAP_SLOT"});
  MAP_SLOT.hasMany(MAP_SLOT_POKEMON, { as: "MAP_SLOT_POKEMONs", foreignKey: "ID_MAP_SLOT"});
  GENERATED_POKEMON.belongsTo(POKEMONS, { as: "ID_POKEMON_POKEMON", foreignKey: "ID_POKEMON"});
  POKEMONS.hasMany(GENERATED_POKEMON, { as: "GENERATED_POKEMONs", foreignKey: "ID_POKEMON"});
  MAP_SLOT_POKEMON.belongsTo(POKEMONS, { as: "ID_POKEMON_POKEMON", foreignKey: "ID_POKEMON"});
  POKEMONS.hasMany(MAP_SLOT_POKEMON, { as: "MAP_SLOT_POKEMONs", foreignKey: "ID_POKEMON"});
  POKEMON_PTYPES.belongsTo(POKEMONS, { as: "ID_POKEMON_POKEMON", foreignKey: "ID_POKEMON"});
  POKEMONS.hasMany(POKEMON_PTYPES, { as: "POKEMON_PTYPEs", foreignKey: "ID_POKEMON"});
  POKEMON_PTYPES.belongsTo(PTYPE, { as: "ID_TYPE_PTYPE", foreignKey: "ID_TYPE"});
  PTYPE.hasMany(POKEMON_PTYPES, { as: "POKEMON_PTYPEs", foreignKey: "ID_TYPE"});
  GENERATED_POKEMON_TRAINER.belongsTo(USERS, { as: "ID_TRAINER_USER", foreignKey: "ID_TRAINER"});
  USERS.hasMany(GENERATED_POKEMON_TRAINER, { as: "GENERATED_POKEMON_TRAINERs", foreignKey: "ID_TRAINER"});
  TEAM_TRAINER.belongsTo(USERS, { as: "ID_TRAINER_USER", foreignKey: "ID_TRAINER"});
  USERS.hasMany(TEAM_TRAINER, { as: "TEAM_TRAINERs", foreignKey: "ID_TRAINER"});

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
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
