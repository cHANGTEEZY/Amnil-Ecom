import React from "react";
import AppRoutes from "./routes/routes";
import { AuthenticateProvider } from "./lib/context/AuthContext";

const App = () => {
  return (
    <AuthenticateProvider>
      <AppRoutes />
    </AuthenticateProvider>
  );
};

export default App;
