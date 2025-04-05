import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "https://fakestoreapi.com/products";

        if (searchValue) {
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

  return (
    <SearchContext.Provider
      value={{ searchValue, setSearchValue, items, apiError }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
