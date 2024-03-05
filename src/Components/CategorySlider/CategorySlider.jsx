import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import Styles from './CategorySlider.module.css'
import axios from "axios";
import LoaderPage from "../LoaderPage/LoaderPage";
import { useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
        <div onClick={onClick} className={Styles.arrowContainer}>
            <i class="fa-solid fa-chevron-right"></i>
        </div>
    </>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
        <div onClick={onClick} className={Styles.arrowContainerLeft}>
        <i class="fa-solid fa-chevron-left"></i>
        </div>
    </>
  );
}

function CustomArrows() {
  let navigate = useNavigate();
  function goAllProducts(){
    navigate('/categories')
  }
  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}
let {isLoading , isError , data , isFetching} = useQuery('categorySlider', getCategories,)
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
    <>
      {isLoading ? <LoaderPage/> : <div className="slider-container">
      <Slider {...settings}>
        {data?.data.data.map(cat =><div className="px-3 mb-5">
          <div className="cursor-pointer">
            <img src={cat.image} alt="" className="w-100" height={200}/>
            <h5 className="text-center">{cat.name}</h5>
          </div>
        </div>)}
      </Slider>
      <button onClick={goAllProducts} style={{transform:'translateY(-40px)'}} className="d-block m-auto btn btn-success w-50 fs-5 fw-bolder">All Products</button>
    </div> }
    </>
  );
}

export default CustomArrows;
