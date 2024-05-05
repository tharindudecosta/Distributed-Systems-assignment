import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { CoursesContextProvider } from "./context/CourseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CoursesContextProvider>
      <App />
    </CoursesContextProvider>
  </React.StrictMode>
);
