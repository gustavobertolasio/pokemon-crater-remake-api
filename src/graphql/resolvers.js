import { fileLoader, mergeResolvers } from "merge-graphql-schemas";
import path from "path";

const typesResolvers= fileLoader(path.join(__dirname, "modules", "**", "resolver.js"));
const resolvers = mergeResolvers(typesResolvers);

export default resolvers;
