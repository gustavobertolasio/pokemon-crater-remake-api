import {
  GENERATED_POKEMON,
  GENERATED_POKEMON_TRAINER,
  POKEMONS,
  MAPS,
  GROWTH_RATE,
  POKEBALL,
  POKEMON_LEARNSET,
  POKEMON_MOVES,
  MOVES,
} from "../../../../models";
import { POKEBALL_TICK, POKEMON_CAUGHT, POKEMON_FLEE } from "../../channels";
import { withFilter } from "graphql-subscriptions";
import { Op } from "sequelize";

const randomizeBetweenNumbers = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const fluctuatingCalc = (level) => {
  let xpToLvUp;
  if (level >= 36) {
    xpToLvUp = Math.pow(level, 3) * ((level / 2 + 32) / 50);
  } else if (level >= 15) {
    xpToLvUp = Math.pow(level, 3) * ((level + 14) / 50);
  } else {
    xpToLvUp = Math.pow(level, 3) * (((level + 1) / 3 + 24) / 50);
  }
  return xpToLvUp;
};

const erraticCalc = (level) => {
  let xpToLvUp;
  if (level >= 98) {
    xpToLvUp = (Math.pow(level, 3) * (160 - level)) / 100;
  } else if (level >= 68) {
    xpToLvUp = (Math.pow(level, 3) * (160 - level)) / 100;
  } else if (level >= 50) {
    xpToLvUp = (Math.pow(level, 3) * ((1911 - 10 * level) / 3)) / 500;
  } else {
    xpToLvUp = (Math.pow(level, 3) * (100 - level)) / 50;
  }
  return xpToLvUp;
};

const calcExpToNextLevel = (level, growthRate) => {
  const ratesCalcs = {
    FST: (4 * Math.pow(level, 3)) / 5,
    MFST: Math.pow(level, 3),
    MSLW:
      (6 / 5) * Math.pow(level, 3) -
      15 * Math.pow(level, 2) +
      100 * level -
      140,
    SLW: (5 * Math.pow(level, 3)) / 4,
    FLUC: fluctuatingCalc(level),
    ERRT: erraticCalc(level),
  };
  const expNeeded = Math.round(ratesCalcs[growthRate]);
  return level === 100 ? 0 : expNeeded >= 0 ? expNeeded : 5;
};

const evaluateHP = (pokemon, specie) => {
  const HP =
    ((2 * specie.HP + pokemon.HP_IV + pokemon.EV_HP / 4) *
      pokemon.POKEMON_LEVEL) /
      100 +
    pokemon.POKEMON_LEVEL +
    10;
  return {
    HP: Math.round(HP),
    CURRENT_HP: Math.round(HP),
  };
};

const evaluateOtherStatus = (pokemon, specie) => {
  const nature = 1; //TODO: Implementar sistema de nature
  const statusCalc = (stat, IV, EV) =>
    Math.round(
      (((2 * stat + IV + EV / 4) * pokemon.POKEMON_LEVEL) / 100 + 5) * nature
    );

  return {
    ATTACK: statusCalc(specie.ATTACK, pokemon.ALL_STATUS_IV, pokemon.EV_ATTACK),
    DEFENSE: statusCalc(
      specie.DEFENSE,
      pokemon.ALL_STATUS_IV,
      pokemon.EV_DEFENSE
    ),
    SPECIAL_ATTACK: statusCalc(
      specie.SPECIAL_ATTACK,
      pokemon.ALL_STATUS_IV,
      pokemon.EV_SPECIAL_ATTACK
    ),
    SPECIAL_DEFENSE: statusCalc(
      specie.SPECIAL_DEFENSE,
      pokemon.SPECIAL_DEFENSE_IV,
      pokemon.EV_SPECIAL_DEFENSE
    ),
    SPEED: statusCalc(specie.SPEED, pokemon.ALL_STATUS_IV, pokemon.EV_SPEED),
  };
};

const evaluateStatus = (pokemon, specie) => {
  return {
    ...pokemon,
    ...evaluateHP(pokemon, specie),
    ...evaluateOtherStatus(pokemon, specie),
  };
};

const generateIVs = (pokemon) => {
  return {
    ...pokemon,
    HP_IV: randomizeBetweenNumbers(0, 31),
    SPECIAL_DEFENSE_IV: randomizeBetweenNumbers(0, 31),
    ALL_STATUS_IV: randomizeBetweenNumbers(0, 31),
  };
};

const generateEVs = (pokemon) => {
  return {
    ...pokemon,
    EV_HP: 1,
    EV_ATTACK: 1,
    EV_DEFENSE: 1,
    EV_SPECIAL_ATTACK: 1,
    EV_SPECIAL_DEFENSE: 1,
    EV_SPEED: 1,
  };
};

const generateLevel = (pokemon, isInitial, growthRateAcronym, mapConfig) => {
  const POKEMON_LEVEL = isInitial
    ? 5
    : randomizeBetweenNumbers(
        mapConfig.MIN_POKEMON_LEVEL,
        mapConfig.MAX_POKEMON_LEVEL
      );

  return {
    ...pokemon,
    POKEMON_LEVEL,
    CURRENT_XP: 0,
    XP_NEXT_LEVEL: calcExpToNextLevel(POKEMON_LEVEL, growthRateAcronym),
  };
};

const calcCatchRate = (
  hpMax,
  actualHp,
  pokemonCatchRate,
  pokeballRate,
  statusBonus = 1
) => {
  return (
    (((3 * hpMax - 2 * actualHp) * pokemonCatchRate * pokeballRate) /
      (3 * hpMax)) *
    statusBonus
  );
};

const calcShakeProbability = (modifiedCatchRate) => {
  return Math.round(65536 / Math.pow(255 / modifiedCatchRate, 0.1875));
};

export const resolver = {
  GENERATED_POKEMON: {
    POKEMON: async (pokemon) =>
      POKEMONS.findOne({ where: { ID: pokemon.ID_POKEMON } }),
  },
  Query: {
    generatedPokemons: () => GENERATED_POKEMON.findAll(),
  },
  Mutation: {
    generatePokemon: async (_, { pokemonId, mapId }) => {
      const specie = await POKEMONS.findOne({
        where: { ID: pokemonId },
      });

      const mapConfig = await MAPS.findOne({ where: { ID: mapId } });

      const pokemon = { ID_POKEMON: +pokemonId };
      const growthRate = await GROWTH_RATE.findOne({
        where: { ID: specie.ID_GROWTH_RATE },
      });

      const pokemonLevel = generateLevel(
        pokemon,
        specie.IS_INITIAL,
        growthRate.GROWTH_ACRONYM,
        mapConfig
      );

      const pokemonIVs = generateIVs(pokemonLevel);
      const pokemonEVs = generateEVs(pokemonIVs);

      const pokemonStatus = evaluateStatus(pokemonEVs, specie);

      const learnset = await POKEMON_LEARNSET.findAll({
        where: { ID_POKEMON: pokemonId },
      });

      let pokemonMoves = learnset.filter(
        (move) => move.LEARN_LEVEL <= pokemonStatus.POKEMON_LEVEL
      );

      if (pokemonMoves.length > 4) {
        pokemonMoves = pokemonMoves.slice(
          pokemonMoves.length - 4,
          pokemonMoves.length - 1
        );
      }

      const generatedPokemon = await GENERATED_POKEMON.create(pokemonStatus);

      const movesInfo = await MOVES.findAll({
        where: {
          ID: { [Op.in]: pokemonMoves.map((move) => move.ID_MOVE) },
        },
      });

      await POKEMON_MOVES.bulkCreate(
        pokemonMoves.map((move) => {
          return {
            ID_GENERATED_POKEMON: generatedPokemon.ID,
            ID_MOVE: move.ID_MOVE,
            CURRENT_PP: movesInfo.find(
              (moveInfo) => moveInfo.ID === move.ID_MOVE
            ).MAX_PP,
          };
        }),
        { validate: true }
      );

      return generatedPokemon;
    },
    catchPokemon: async (
      _,
      { generatedPokemonId, pokeballItemId, trainerId }
    ) => {
      const chosenPokeball = await POKEBALL.findOne({
        where: { ID_ITEM: pokeballItemId },
      });

      const pokemonBeingCaptured = await GENERATED_POKEMON.findOne({
        where: { ID: generatedPokemonId },
      });

      const specie = await POKEMONS.findOne({
        where: { ID: pokemonBeingCaptured.ID_POKEMON },
      });

      // TODO: Implementar status de pokemon (poison, stunned, paralyzed etc)
      const pokemonStatus = 1;

      const modifiedCatchRate = calcCatchRate(
        pokemonBeingCaptured.HP,
        pokemonBeingCaptured.CURRENT_HP,
        specie.CATCH_RATE,
        chosenPokeball.CATCH_RATE,
        pokemonStatus
      );
      console.log(modifiedCatchRate)
      const shakeProbability = calcShakeProbability(modifiedCatchRate);
      const shakeArray = [];
      for (let i = 0; i < 4; i++) {
        const randomized = randomizeBetweenNumbers(0, 65535);

        if (randomized >= shakeProbability) {
          shakeArray.push(false);
          return shakeArray;
        } else {
          shakeArray.push(true);
        }
      }

      await GENERATED_POKEMON_TRAINER.create({
        ID_TRAINER: trainerId,
        ID_GENERATED_POKEMON: generatedPokemonId,
      });

      return shakeArray;
    },
  },
  Subscription: {
    catchingPokemon: {
      subscribe: withFilter(
        (_, _a, { pubsub }) =>
          pubsub.asyncIterator([POKEBALL_TICK, POKEMON_CAUGHT, POKEMON_FLEE]),
        (payload, variables) => {
          return payload.trainerId === variables.trainerId;
        }
      ),
    },
  },
};
