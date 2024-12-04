import { QueryTypes } from "sequelize";
import { GENERATED_POKEMON, sequelize, TEAM_TRAINER } from "../../../../models";

export const resolver = {
  TEAM_TRAINER: {
    TEAM: async (pokemons) => {
      const trainerId = pokemons[0].ID_TRAINER;

      const slotsCreated = await TEAM_TRAINER.count({
        where: { ID_TRAINER: trainerId },
      });

      if (slotsCreated < 6) {
        pokemons.push({
          SLOT_NUMBER: slotsCreated + 1,
          GENERATED_POKEMON: null,
        });
      }

      return pokemons.sort((pokemonA, pokemonB) =>
        pokemonA.SLOT_NUMBER > pokemonB.SLOT_NUMBER ? 1 : -1
      );
    },
  },
  TYPE: {
    GENERATED_POKEMON: async (pokemon) =>
      GENERATED_POKEMON.findOne({
        where: { ID: pokemon.ID_GENERATED_POKEMON },
      }),
  },
  Query: {
    team: async (_, { trainerId }) =>
      await TEAM_TRAINER.findAll({ where: { ID_TRAINER: trainerId } }),
  },
  Mutation: {
    addNewPokeToTeam: async (
      _,
      { generatedPokemonIdBeingAdded, trainerId }
    ) => {
      let slotsCreated = await TEAM_TRAINER.count({
        where: { ID_TRAINER: trainerId },
      });

      if (slotsCreated === 6) {
        throw new Error("Passou de 6 amigão");
      }

      await TEAM_TRAINER.create({
        SLOT_NUMBER: slotsCreated + 1,
        ID_GENERATED_POKEMON: generatedPokemonIdBeingAdded,
        ID_TRAINER: trainerId,
      });

      const pokemons = await TEAM_TRAINER.findAll({
        where: { ID_TRAINER: trainerId },
      });

      slotsCreated = await TEAM_TRAINER.count({
        where: { ID_TRAINER: trainerId },
      });

      if (slotsCreated < 6) {
        pokemons.push({
          SLOT_NUMBER: slotsCreated + 1,
          GENERATED_POKEMON: null,
        });
      }

      return pokemons.sort((pokemonA, pokemonB) =>
        pokemonA.SLOT_NUMBER > pokemonB.SLOT_NUMBER ? 1 : -1
      );
    },
    changePokemonFromTeam: async (
      _,
      { generatedPokemonIdBeingAdded, slot, trainerId }
    ) => {
      await TEAM_TRAINER.update(
        {
          ID_GENERATED_POKEMON: generatedPokemonIdBeingAdded,
        },
        {
          where: {
            SLOT_NUMBER: slot,
            ID_TRAINER: trainerId,
          },
        }
      );

      const pokemons = await TEAM_TRAINER.findAll({
        where: { ID_TRAINER: trainerId },
      });

      const slotsCreated = await TEAM_TRAINER.count({
        where: { ID_TRAINER: trainerId },
      });

      if (slotsCreated < 6) {
        pokemons.push({
          SLOT_NUMBER: slotsCreated + 1,
          GENERATED_POKEMON: null,
        });
      }

      return pokemons.sort((pokemonA, pokemonB) =>
        pokemonA.SLOT_NUMBER > pokemonB.SLOT_NUMBER ? 1 : -1
      );
    },
    removeFromTeam: async (_, { slot, trainerId }) => {
      let slotList = await TEAM_TRAINER.findAll({
        where: { ID_TRAINER: trainerId },
      });

      await TEAM_TRAINER.destroy({
        where: { SLOT_NUMBER: slot, ID_TRAINER: trainerId },
      });

      let slicedList = slotList.slice(slot, slotList.length);

      if (slicedList.length) {
        const updateQuery = `UPDATE TEAM_TRAINER SET SLOT_NUMBER = SLOT_NUMBER - 1 WHERE ID_GENERATED_POKEMON IN (${slicedList.map(
          (slicedSlot) => slicedSlot.ID_GENERATED_POKEMON
        )}) AND ID_TRAINER = ${trainerId}`;

        await sequelize.query(updateQuery, { type: QueryTypes.UPDATE });
      }

      const pokemons = await TEAM_TRAINER.findAll({
        where: { ID_TRAINER: trainerId },
      });

      const slotsCreated = await TEAM_TRAINER.count({
        where: { ID_TRAINER: trainerId },
      });

      if (slotsCreated < 6) {
        pokemons.push({
          SLOT_NUMBER: slotsCreated + 1,
          GENERATED_POKEMON: null,
        });
      }

      return pokemons.sort((pokemonA, pokemonB) =>
        pokemonA.SLOT_NUMBER > pokemonB.SLOT_NUMBER ? 1 : -1
      );
    },
  },
};
