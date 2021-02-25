import React from "react";
import ReactDOM from "react-dom";
import AllocateEntry from "./AllocateEntry";

const App = () => (
  <>
    <h1>My React and TypeScript App from host application  :)  </h1>
    <AllocateEntry />
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);