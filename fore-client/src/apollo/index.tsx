import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { SERVER_URL } from "../utils/secrets";
import { getAuth } from "firebase/auth";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({ uri: SERVER_URL + 'graphql' });

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await getAuth().currentUser?.getIdToken() || '';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, errorLink, httpLink])
});

export { client };
