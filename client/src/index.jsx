import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./context/Context";

import GlobalStyles from "./GlobalStyles/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <ContextProvider>
                <App />
            </ContextProvider>
        </GlobalStyles>
    </React.StrictMode>
);
