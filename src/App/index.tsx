import React, { useEffect } from "react";
import { useLocation, Routes } from "react-router-dom";
// import { renderRoutes } from "react-router-config";
import routes from "./routes";

function App() {
  const location = useLocation();
  const [routeObj] = routes;
  useEffect(() => {
    console.log("location is -----", location);
  });
  return (
    <div className="App">
      <h1> hello React </h1>
      <Routes></Routes>

      <>{routeObj.component}</>
    </div>
  );
}

export default App;
