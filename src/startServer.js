import { ApolloServer, PubSub } from "apollo-server";

const startServer = ({ typeDefs, resolvers }) => {
  const pubsub = new PubSub();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { pubsub },
    subscriptions: {
      path: "/subscriptions",
      onConnect: () => {
        console.log("Connected.");
      },
      onDisconnect: () => {
        console.log("Disconnected.");
      },
    },
  });
  server.listen().then(({ url }) => console.log(`rodando em ${url}`));
};
export default startServer;
