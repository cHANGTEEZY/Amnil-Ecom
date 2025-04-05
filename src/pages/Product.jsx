import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState();

  const { id: productId } = useParams();

  const getSelectedProduct = async () => {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${producId}`
    );
    if (!response.data) {
      throw new Error("Error getting data");
    }
  };

  return <div>Product {productId} </div>;
};

export default Product;
