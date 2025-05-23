import React, { useContext } from "react";
import Header from "../components/Header";
import SearchContext from "../lib/context/SearchContext";
import { Card } from "antd";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ErrorPage from "../components/Error";
import Loader from "../components/Loader";

const Home = () => {
  const { items, apiError, searchValue, isLoading } = useContext(SearchContext);

  if (apiError.message) {
    return <ErrorPage message={apiError.message} code={apiError.code} />;
  }

  const { Meta } = Card;

  const handleCardClick = (itemId) => {
    window.open(`/product/${itemId}`, "_blank");
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="py-6 px-4 max-w-[1400px] m-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array(10)
                .fill(null)
                .map((_, index) => (
                  <Loader key={index} />
                ))}
            </div>
          ) : items?.length > 0 ? (
            <>
              <h1
                className="capitalize font-bold text-4xl text-gray-800 mb-5"
                id="products"
              >
                {searchValue === "All Products"
                  ? "All Products"
                  : `${searchValue} Products`}
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
          ) : (
            <p className="flex justify-center items-center h-[300px] text-3xl">
              Product of given cirteria not available
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
