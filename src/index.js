import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./components/app/app";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import dataReducer from "./reducers/dataSlice";
import pageReducer from "./reducers/pageSlice";
import settingsReducer from "./reducers/settingsSlice";
import { ErrorBoundary } from "react-error-boundary";

import i18next from  "./il8n";

//Redux store
const store = configureStore({
  reducer: {
    data: dataReducer,
    page: pageReducer,
    settings: settingsReducer,
  },
});


const Error = ({error})=>{


  return <div className="error">
      <h1>{i18next.t("error")}</h1>
      <h3>{i18next.t("errorDesc")}</h3>
      <h4>{error.message}</h4>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary
        fallbackRender={Error}
        >
        <Provider store={store}>
          <App />
        </Provider>      

      
    </ErrorBoundary >
  </React.StrictMode>
);
