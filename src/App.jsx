import React from "react";
import AppRoutes from "./routes/routes";
import { AuthenticateProvider } from "./lib/context/AuthContext";
import { SearchContextProvider } from "./lib/context/SearchContext";
import { Provider } from "react-redux";
import store from "./lib/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <SearchContextProvider>
        <AuthenticateProvider>
          <AppRoutes />
        </AuthenticateProvider>
      </SearchContextProvider>
    </Provider>
  );
};

export default App;
