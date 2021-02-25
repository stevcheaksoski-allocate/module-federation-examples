import React, { Suspense } from "react";
import ReactDOM from "react-dom";

const AllocateEntry = React.lazy(() => import("@allocate-shared/AllocateEntry"));

const App = () => (
  <>
    <h1>Client application app</h1>
    <hr />
    <hr />
    <Suspense fallback="Loading ...">
      <AllocateEntry />
    </Suspense>
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);