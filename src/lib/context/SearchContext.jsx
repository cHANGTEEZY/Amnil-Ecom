import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import ErrorPage from "../../components/Error";

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("All Products");
  const [items, setItems] = useState([]);
  const [apiError, setApiError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        let url =
          searchValue === "All Products"
            ? "https://fakestoreapi.com/products"
            : `https://fakestoreapi.com/products/category/${searchValue.toLowerCase()}`;

        const response = await axios.get(url);
        setItems(response.data);
        setApiError({});
      } catch (error) {
        const statusCode = error.response?.status || 500;
        const message = error.response?.data?.message || error.message;
        setApiError({ code: statusCode, message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, [searchValue]);

  return (
    <SearchContext.Provider
      value={{ searchValue, setSearchValue, items, isLoading, apiError }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
