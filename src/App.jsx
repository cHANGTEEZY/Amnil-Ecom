import React from "react";
import AppRoutes from "./routes/routes";
import { AuthenticateProvider } from "./lib/context/AuthContext";
import { SearchContextProvider } from "./lib/context/SearchContext";

const App = () => {
  return (
    <SearchContextProvider>
      <AuthenticateProvider>
        <AppRoutes />
      </AuthenticateProvider>
    </SearchContextProvider>
  );
};

export default App;
