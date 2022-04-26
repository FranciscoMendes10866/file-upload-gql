import ReactDOM from "react-dom";
import { Provider } from "urql";

import { App } from "./App";
import { client } from "./modules/graphql";

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById("app")
);
