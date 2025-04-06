import React, { useEffect, useContext } from "react";
import AuthContext from "../lib/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchContext from "../lib/context/SearchContext";
import { Card } from "antd";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const { items, apiError, searchValue } = useContext(SearchContext);
  const { Meta } = Card;

  const handleCardClick = (itemId) => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else {
      window.open(`/product/${itemId}`, "_blank");
    }
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="py-6 px-4 max-w-[1400px] m-auto">
          {items && items.length > 0 && !apiError ? (
            <>
              <h1
                className="font-bold text-4xl text-gray-800 mb-5"
                id="products"
              >
                All {searchValue === "All Products" ? "" : searchValue} Products
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    onClick={() => handleCardClick(item.id)}
                    hoverable
                    cover={
                      <img
                        alt={item.title}
                        src={item.image}
                        className="object-contain w-full h-64"
                      />
                    }
                    className="shadow-lg rounded-lg hover:shadow-2xl transition-all"
                  >
                    <Meta title={item.title} />
                    <p className="text-center text-xl font-semibold mt-2">
                      ${item.price}
                    </p>
                  </Card>
                ))}
              </div>
            </>
          ) : apiError ? (
            <span className="text-red-500">{apiError}</span>
          ) : (
            <p className="text-center text-xl">No products available</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
