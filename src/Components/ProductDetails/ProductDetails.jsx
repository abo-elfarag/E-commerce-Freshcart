import React, { useContext, useState } from 'react';
import Styles from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import LoaderPage from '../LoaderPage/LoaderPage';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Slider from "react-slick";
import Modal from 'react-bootstrap/Modal';
import { WishListContext } from '../../Context/WishListContext';

export default function ProductDetails() {
  const {addProductToWishList , getUserWishList , idProducts , wishListDeleteProduct} = useContext(WishListContext);

  async function WishListAdd(id){
    if(idProducts.includes(id)){
        const res = await wishListDeleteProduct(id)
        toast('Successfully remove product', {
            duration:2000 , position:'top-center'
        })
    }else{
        const res = await addProductToWishList(id)
    }
    
    getUserWishList();
}


  const { addProductToCart } = useContext(cartContext);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // Add state for current image index
  const { id } = useParams();

  // Function to handle moving to the next image
  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex === productDetails.images.length - 1 ? 0 : prevIndex + 1));
  };

  // Function to handle moving to the previous image
  const prevImage = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? productDetails.images.length - 1 : prevIndex - 1));
  };

  async function addProduct(id) {
    let res = await addProductToCart(id);
  }

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { isError, isLoading, data } = useQuery(`productDetails-${id}`, getProductDetails);
  const productDetails = data?.data.data;

  // Function to handle opening the modal
  const handleOpenModal = (image, index) => {
    setModalImage(image);
    setCurrentIndex(index);
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setModalImage('');
    setShowModal(false);
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={Styles.arrowContainer}>
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={Styles.arrowContainerLeft}>
        <i className="fa-solid fa-chevron-left"></i>
      </div>
    );
  }

  // Settings for the slider
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "linear"
  };

  return (
    <>
      {isLoading ? (
        <LoaderPage />
      ) : (
        <div className='pt-5'>
          <div className="container ">
            <div className="row align-items-center gx-4 mb-5">
              <div className="col-md-3">
                <Slider {...settings}>
                  {productDetails.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Slide ${index}`}
                      className='w-100 cursor-pointer'
                      onClick={() => handleOpenModal(img, index)}
                    />
                  ))}
                </Slider>
              </div>
              <div className="col-md-9">
                <article className='d-flex flex-column justify-content-center px-4'>
                  <h1>{productDetails.title}</h1>
                  <p>{productDetails.description}</p>
                  <h2 className='h6 text-main'>{productDetails.category.name}</h2>
                  <div className='d-flex justify-content-between align-items-center pe-5'>
                    {productDetails.priceAfterDiscount ? (
                      <p>{productDetails.priceAfterDiscount}EGP - <span className='text-decoration-line-through'>{productDetails.price}EGP</span></p>
                    ) : (
                      <p>{productDetails.price}EGP</p>
                    )}
                    <p>{productDetails.ratingsAverage}
                      <span className='ms-1'><i style={{ color: 'yellow' }} className="fa-solid fa-star"></i></span>
                    </p>
                  </div>
                  <div className='px-5 w-100 d-flex justify-content-between align-items-center'>
                    <button onClick={() => addProduct(productDetails.id)} className='btn btn-success w-75'> + add to cart</button>
                    {idProducts.includes(productDetails.id) ? <i onClick={()=> WishListAdd(productDetails.id)} class="fa-solid fa-heart fs-3 cursor-pointer text-danger"></i> : <i onClick={()=> WishListAdd(productDetails.id)} class="fa-solid fa-heart fs-3 cursor-pointer"></i> }
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for displaying the enlarged image */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
      {productDetails?.images && (
  <Modal.Body>
    <div className="d-flex justify-content-between align-items-center position-relative">
      <button className={Styles.modalPrevBtn} onClick={prevImage}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <img
        src={productDetails.images[currentIndex]}
        alt="Enlarged"
        className={`img-fluid ${Styles.sliderImage}`}
      />
      <button className={Styles.modalNextBtn} onClick={nextImage}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </Modal.Body>
)}
      </Modal>
    </>
  );
}
