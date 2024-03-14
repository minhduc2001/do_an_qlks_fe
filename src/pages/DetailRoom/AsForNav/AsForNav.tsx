// @ts-nocheck

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

function AsNavFor({ images }: { images: string[] }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div className="slider-container">
      <Slider
        asNavFor={nav2}
        ref={(slider) => (sliderRef1 = slider)}
        {...settings}
      >
        {images.map((image, index) => {
          return (
            <div key={index} className={"w-full h-[650px]"}>
              <img src={image} alt="" className="object-cover w-full" />
            </div>
          );
        })}
      </Slider>
      <div className="h-6"></div>
      <Slider
        asNavFor={nav1}
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
        {...settings}
      >
        {images.map((image, index) => {
          return (
            <div key={index} className="w-full h-[200px] div-2">
              <img src={image} alt="" className="h-full w-full object-cover" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default AsNavFor;
