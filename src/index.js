import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { ConfigProvider } from "antd";
import colors from "./styles/base/_colors.scss";
import { AuthContextProvider } from "./context/auth-context";
import {CookiesProvider} from 'react-cookie'

const root = ReactDOM.createRoot(document.getElementById("root"));

const customTheme = { token: { colorPrimary: colors.primaryColor } };

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <CookiesProvider>
      <ConfigProvider theme={customTheme}>
        <AuthContextProvider>
        <App />
        </AuthContextProvider>
      </ConfigProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
