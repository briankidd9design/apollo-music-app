import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./App";
import client from "./graphql/client";

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
