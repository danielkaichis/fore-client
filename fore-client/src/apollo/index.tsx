import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SERVER_URL } from "../utils/secrets";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: SERVER_URL + "graphql",
});

export { client };
