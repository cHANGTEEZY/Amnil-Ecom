import React from "react";
import { Carousel } from "antd";
import { hero1, hero2, hero3 } from "../assets";

const Hero = () => {
  return (
    <div className="relative max-w-[1400px] mx-auto my-10">
      <Carousel
        autoplay
        infinite={true}
        speed={500}
        dots={true}
        slidesToShow={1}
        className="w-full max-h-[600px]"
      >
        <div>
          <img
            src={hero1}
            alt="hero section image"
            className="object-cover w-full h-[600px] rounded-lg"
          />
        </div>
        <div>
          <img
            src={hero2}
            alt="hero section image"
            className="object-cover w-full h-[600px] rounded-lg"
          />
        </div>
        <div>
          <img
            src={hero3}
            alt="hero section image"
            className="object-cover w-full h-[600px] rounded-lg"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
