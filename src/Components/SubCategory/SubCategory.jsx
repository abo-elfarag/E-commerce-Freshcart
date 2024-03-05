import React, { useContext, useEffect, useState } from 'react'
import Styles from './SubCategory.module.css'
import axios from 'axios';
import LoaderPage from '../LoaderPage/LoaderPage';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { cartContext } from '../../Context/CartContext';
import { CategoryContext } from '../../Context/CategoryContext';

export default function Products() {
    const {subCategory} = useContext(CategoryContext);
    useEffect(()=>{
      getAllProducts()
    })
    
    const {addProductToCart} = useContext(cartContext);

    async function addProduct(id){
        const res = await addProductToCart(id);
        console.log('res fro products' , res)
    }

    function getAllProducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    let {isLoading , isError , data , isFetching} = useQuery('products', getAllProducts,{
        cacheTime:120000
    })
    
    return (
        <>
        <div className='pt-5'>
            <div className="container mb-5">
                <input type="search" placeholder='Search....' className='form-control w-75 m-auto'/>
            </div>
        </div>
        {isLoading ? <LoaderPage/> : <div className="container">
                <div className="row g-4">
                  
                {data.data.data.filter(product => product.category.name ===  subCategory ).map((product, idx) => (
    <div key={idx} className="col-md-3">
      <div className={Styles.containerProductCard}>
        <Link to={`/productdetails/${product.id}`}>
          <div className={Styles.productCard}>
            {product.images && product.images[0] && (
              <img
                src={product.images[0]}
                alt=""
                className="w-100 mb-3"
                height={250}
              />
            )}
            <h3 className="h6 text-main">{product.category.name}</h3>
            <h2 className="h5 fw-bolder">
              {product.title.split(' ').slice(0, 2).join(' ')}
            </h2>
            <div className="d-flex justify-content-between align-items-center">
              {product.priceAfterDiscount ? (
                <p>
                  {product.priceAfterDiscount}EGP -{' '}
                  <span className="text-decoration-line-through">
                    {product.price}EGP
                  </span>
                </p>
              ) : (
                <p>{product.price}EGP</p>
              )}
              <p>
                {product.ratingsAverage}
                <span className="ms-1">
                  <i style={{ color: 'yellow' }} className="fa-solid fa-star"></i>
                </span>
              </p>
            </div>
          </div>
        </Link>
        <div className={Styles.add}>
          <i onClick={() => addProduct(product.id)} className="fa-solid fa-cart-shopping fs-3 text-main cursor-pointer"></i>
          <i className="fa-solid fa-heart fs-3"></i>
        </div>
      </div>
    </div>
  ))}

                    
                </div>
            </div>}
        </>
    )
}
