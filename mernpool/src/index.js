import React from "react";
import ReactDOM from "react-dom";
import App from "./Register";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

ReactDOM.render(<App />, document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
