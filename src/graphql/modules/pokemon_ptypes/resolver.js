import { PTYPE } from "../../../../models";
import { Op } from "sequelize";

export const resolver = {
  POKEMON_PTYPES: {
    TYPES: async (pokemons) =>
      PTYPE.findAll({
        where: { ID: { [Op.in]: pokemons.map((pokemon) => pokemon.ID_TYPE) } },
      }),
  },
};
