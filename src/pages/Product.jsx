import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { addItem, clearCart } from "../lib/store/cartSlice";

const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const { id: productId } = useParams();

  const dispatch = useDispatch();

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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-xl text-gray-700">Loading...</span>
      </div>
    );
  }

  return (
    <section className="max-w-[1400px] mx-auto py-10 px-5">
      <Header showNav={false} showSearch={false} />

      <div className="flex flex-col md:flex-row my-10 gap-10">
        <div className="flex-shrink-0 w-full md:w-1/2 bg-gray-50 rounded-lg shadow-lg overflow-hidden">
          <img
            className="w-full  h-[300px] mix-blend-multiply object-contain sm:h-[400px] md:h-[500px] lg:h-[700px] "
            src={selectedProduct?.image}
            alt={selectedProduct?.title}
          />
        </div>

        <div className="flex flex-col gap-5 md:w-1/2">
          <h1 className="text-3xl font-semibold text-gray-800">
            {selectedProduct?.title}
          </h1>
          <p className="text-lg text-gray-600">
            {selectedProduct?.description}
          </p>
          <p className="text-xl font-bold text-gray-900">
            ${selectedProduct?.price}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              Buy Now
            </button>
            <button
              onClick={() =>
                dispatch(
                  addItem({
                    id: selectedProduct.id,
                    price: selectedProduct.price,
                    quantity: 1,
                  })
                )
              }
              className="w-full py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Product;
