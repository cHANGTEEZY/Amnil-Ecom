import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import ErrorPage from "../../components/Error";

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("All Products");
  const [items, setItems] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url;
        if (searchValue === "All Products") {
          url = "https://fakestoreapi.com/products";
        }
        if (searchValue !== "All Products") {
          url = `https://fakestoreapi.com/products/category/${searchValue}`;
        }

        const response = await axios.get(url);

        if (!response.data) {
          throw new Error(
            `Error fetching products for category: ${searchValue}`
          );
        }

        setItems(response.data);
      } catch (error) {
        setApiError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();

    return () => {
      setItems([]);
    };
  }, [searchValue]);

  if (apiError) {
    return <ErrorPage message={apiError} />;
  }

  return (
    <SearchContext.Provider
      value={{ searchValue, setSearchValue, items, apiError }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
