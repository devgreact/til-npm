import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  // 전연 store 를 활용함.
  <Provider store={store}>
    <App />
  </Provider>,
);
