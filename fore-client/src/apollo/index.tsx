import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from "@apollo/client";
import { SERVER_URL } from "../utils/secrets";
import useAuth from "../auth/useAuth";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({ uri: SERVER_URL + 'graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const user = useAuth().auth.currentUser;
  const token =  user?.getIdToken()
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }));

  return forward(operation);
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: concat(authMiddleware, httpLink),
  link,
});

export { client };
