import React from 'react'
import Styles from './MainSlider.module.css'
import Slider from 'react-slick';
import SliderImg1 from '../../imgs/banner-4.jpeg';
import SliderImg3 from '../../imgs/blog-img-2.jpeg';
import SliderImg4 from '../../imgs/grocery-banner.png';
import SliderImg5 from '../../imgs/grocery-banner-2.jpeg';
import SliderImg7 from '../../imgs/slider-2.jpeg';
import SliderImg8 from '../../imgs/slider-image-2.jpeg';
import SliderImg9 from '../../imgs/slider-image-3.jpeg';



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
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src={SliderImg1} alt="" className='w-100 rounded-3' height={250}/>
          </div>
          <div>
          <img src={SliderImg3} alt="" className='w-100 rounded-3' height={250}/>
          </div>
          <div>
          <img src={SliderImg4} alt="" className='w-100 rounded-3' height={250}/>
          </div>
          <div>
          <img src={SliderImg5} alt="" className='w-100 rounded-3' height={250}/>
          </div>
          <div>
          <img src={SliderImg7} alt="" className='w-100 rounded-3' height={250}/>
          </div>
          <div>
          <img src={SliderImg8} alt="" className='w-100 rounded-3' height={250}/>
          </div>
        </Slider>
      </div>
    );
  }
  
  export default CustomArrows;