import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from "@apollo/client";
import { SERVER_URL } from "../utils/secrets";
import { onError } from '@apollo/client/link/error';
import useAuth from "../auth/useAuth";

const httpLink = new HttpLink({ uri: '/graphql' });

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export { client };
