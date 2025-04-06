import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState();
  const [loading, setLoading] = useState(true);

  const { id: productId } = useParams();

  useEffect(() => {
    const getSelectedProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        if (!response.data) {
          throw new Error("Error getting data");
        }
        setSelectedProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getSelectedProduct();
  }, [productId]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Product {productId}</div>;
};

export default Product;
