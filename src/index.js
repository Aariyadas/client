import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#802828",
          colorBorder: "#802828",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
