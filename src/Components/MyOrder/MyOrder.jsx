import React, { useContext, useEffect, useState } from 'react'
import Styles from './MyOrder.module.css'
import axios from 'axios'
import { CategoryContext } from '../../Context/CategoryContext';
import { useNavigate } from 'react-router-dom';
import { BrandContext } from '../../Context/BrandContext';
import { TokenContext } from '../../Context/TokenContext';
import { jwtDecode } from 'jwt-decode';
import { useQuery } from 'react-query';
import LoaderPage from '../LoaderPage/LoaderPage';

export default function MyOrder() {
    const {token,userData } = useContext(TokenContext);

    const [allMyOrder , setAllMyOrder] = useState(null);
    
    const navigate = useNavigate()
    const {subCategory,setSubCategory} = useContext(CategoryContext)
    function goToCategory(name){
        setSubCategory(name);
        navigate('/subCategory');
        
    }


    const {subBrand,setSubBrand} = useContext(BrandContext);
    async function goToBrand(name){
        navigate('/subBrand')
        await setSubBrand(name)
    }

     async function getUserOrder(){
         await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`)
        .then((res)=> {
           setAllMyOrder(res.data);
       })
           .catch((err)=> {
               console.log('err',err)
           })
   }
   let {isLoading , isError , data , isFetching} = useQuery('myOrder', getUserOrder,{
    cacheTime:120000
})
   
   useEffect(()=>{
    getUserOrder()
   },[])

    return (
        <>
            
            {isLoading? <LoaderPage/> : <div className="container py-5">
                <h2>My all order</h2>
                {allMyOrder?.map((cart,idx)=> <div className='border border-bottom-1 border-top-0 border-start-0 border-end-0 border-danger mb-5'>
                    {cart.cartItems.map((cartItem,idx)=> <div>
                        <div className='row mt-'>
                        <div className="col-md-1">
                            <img src={cartItem.product.imageCover} alt="" className='w-100'/>
                        </div>
                        <div className="col-md-11">
                            <div className='d-flex justify-content-evenly mb-2'>
                                <p>{cartItem.product.title}</p>
                                <p>count : {cartItem.count}</p>
                            </div>
                            <div className='d-flex justify-content-between mb-3'>
                                <p onClick={()=> goToCategory(cartItem.product.category.name)}>Category : <span className='bg-success text-white fw-bolder px-3 py-1 rounded-3 cursor-pointer'>{cartItem.product.category.name}</span></p>
                                <p onClick={()=> goToBrand(cartItem.product.brand.name)}>Brand : <span className='bg-success text-white fw-bolder px-3 py-1 rounded-3 cursor-pointer'>{cartItem.product.brand.name}</span></p>
                                <p>Price : <span className='fw-bolder'>{cartItem.price}</span></p>
                            </div>
                        </div>
                        </div>
                        <div className='border-bottom border-2 w-75 m-auto mb-4'></div>
                    </div>)}
                    
                    <div className='d-flex justify-content-between mb-4'>
                        <p>Total price : <span className='fw-bolder'>{cart.totalOrderPrice}</span></p>
                        <p>Payment : <span className='fw-bolder'>{cart.paymentMethodType}</span></p>
                        <p>Date : {cart.createdAt.replace('T', ' ').substring(0, 19)}</p>
                    </div>
                    </div>)}
            </div>}
            
        </>
    )
}
