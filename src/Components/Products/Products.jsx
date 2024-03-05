import React, { useContext, useEffect, useState } from 'react'
import Styles from './Products.module.css'
import axios from 'axios';
import LoaderPage from '../LoaderPage/LoaderPage';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { cartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';

export default function Products() {
    const {addProductToCart} = useContext(cartContext);
    const {addProductToWishList , getUserWishList , idProducts , wishListDeleteProduct} = useContext(WishListContext);

    async function addProduct(id){
        const res = await addProductToCart(id);
    }

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

    function getAllProducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    let {isLoading , isError , data , isFetching} = useQuery('products', getAllProducts,{
        cacheTime:120000
    })
    
    // useEffect(() => {
    //     console.log(idProducts)
    //   }, [idProducts]);


    return (
        <>
        <div className='pt-5'>
            <div className="container mb-5">
                <input type="search" placeholder='Search....' className='form-control w-75 m-auto'/>
            </div>
        </div>
        {isLoading ? <LoaderPage/> : <div className="container-fluid">
                <div className="row g-4">
                    {data?.data.data.map( ( product,idx ) => <div key={idx} className="col-lg-3 col-md-4 col-sm-6">
                        <div className={Styles.containerProductCard}>
                        <Link to={`/productdetails/${product.id}`}>
                        <div className={Styles.productCard}>
                            <img src={product.images[0]} alt="" className='w-100 mb-3' height={250}/>
                            <h3 className='h6 text-main'>{product.category.name}</h3>
                            <h2 className='h5 fw-bolder'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
                            <div className='d-flex justify-content-between align-items-center'>
                            {product.priceAfterDiscount ? <p>{product.priceAfterDiscount}EGP - <span className='text-decoration-line-through'>{product.price}EGP</span></p> : <p>{product.price}EGP</p>}
                                <p>{product.ratingsAverage}
                                    <span className='ms-1'><i style={{color:'yellow'}} class="fa-solid fa-star"></i></span>
                                </p>
                            </div>
                            
                        </div>
                        </Link>
                        <div className={Styles.add}>
                                <i onClick={()=> addProduct(product.id)} class="fa-solid fa-cart-shopping fs-3 text-main cursor-pointer"></i>
                                {idProducts.includes(product.id) ? <i onClick={()=> WishListAdd(product.id)} class="fa-solid fa-heart fs-3 cursor-pointer text-danger"></i> : <i onClick={()=> WishListAdd(product.id)} class="fa-solid fa-heart fs-3 cursor-pointer"></i> }
                                
                            </div>
                        </div>
                    </div>)}
                    
                </div>
            </div>}
        </>
    )
}

