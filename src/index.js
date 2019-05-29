import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "./App";
import * as serviceWorker from "./serviceWorker";


  const client = new ApolloClient({
    uri: "https://travel-map-241002.appspot.com/graphql",
    request: async operation => {
    {
      const token = await localStorage.getItem('token');
      operation.setContext({
          headers: {
              authorization: (token) ? token : ''
          },
      });
  }}
  });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
