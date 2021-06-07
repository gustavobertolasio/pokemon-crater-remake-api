import { ApolloServer, PubSub } from "apollo-server";

const startServer = ({ typeDefs, resolvers }) => {
  const pubsub = new PubSub();
  const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub } });
  server.listen().then(({ url }) => console.log(`rodando em ${url}`));
};
export default startServer;
