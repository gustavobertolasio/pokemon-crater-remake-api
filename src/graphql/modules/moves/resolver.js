import { MOVES, PTYPE, MOVE_CATEGORY } from "../../../../models";

export const resolver = {
  MOVES: {
    TYPE: (req) => PTYPE.findOne({ where: { ID: req.ID_PTYPE } }),
    CATEGORY: (req) => MOVE_CATEGORY.findOne({ where: { ID: req.ID_CATEGORY } }),
  },
  Query: {
    getMoves: () => MOVES.findAll(),
  },
};
