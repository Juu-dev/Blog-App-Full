import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./context/Context";

import GlobalStyles from "./GlobalStyles/GlobalStyles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <ContextProvider>
        <GoogleOAuthProvider clientId="938535920962-khshvosh7c6rhegmc540n13kqragqijk.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </ContextProvider>
    </GlobalStyles>
  </React.StrictMode>
);
