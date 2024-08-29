import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import { UserProvider } from "./Contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      {/* <RouterProvider router={router} /> */}
      <App />
    </UserProvider>
  </StrictMode>
);
