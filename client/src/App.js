import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import { QUERY_POSTS } from "./utils/queries";

import MainApp from "./components/MainApp/MainApp";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // const [state, setState] = useState([])
  // const { loadingPosts, data: postsData } = useQuery(QUERY_POSTS);

  // useEffect(() => {
  //   console.log('huh?');
  //   setState(postsData)
  // }, []);

    // useEffect(() => {
    //   useQuery(QUERY_POSTS).then(
    //         res => setState(res.data)
    //     )
    // }, [])
  return (
    <ApolloProvider client={client}>
      <MainApp />
    </ApolloProvider>
  );
}

export default App;
