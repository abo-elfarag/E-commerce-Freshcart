import React, { useContext } from 'react'
import Styles from './Cart.module.css'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query';
import LoaderPage from '../LoaderPage/LoaderPage';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const navigate = useNavigate()
    function goToProducts(){
        navigate('/products')
    }
    function goToCheckout(){
        navigate('/checkout')
    }
    const {getUserCart , numberOfCartItems, totalCartPrice , allProductOfCart , updateCount , deleteProduct , clearAllProduct} = useContext(cartContext)
    let {isLoading , isError , data , isFetching} = useQuery('productsOfCart', getUserCart,{
        cacheTime:120000
    })
    
    async function updateMyProductCount(id , newCount){
        const res = await updateCount(id , newCount);
        if(res){
            toast.success('product update successfully.', {position: 'top-center'})
        }else{
            toast.error('Error occurred.', {position: 'top-center'})
        }
    }
    async function myDeleteProduct(id){
        const res = await deleteProduct(id);
        if(res){
            toast.success('product is deleted successfully.', {position: 'top-center'})
        }else{
            toast.error('Error...', {position: 'top-center'})
        }
    }
    return (
        <>
            {isLoading ? <LoaderPage/> : <div className="container">
                <h2 className='mb-4'>Shop Cart</h2>
                <h5 className='mb-5'>total Cart Price: {totalCartPrice}  LE</h5>
                <button disabled={numberOfCartItems == 0} onClick={ clearAllProduct} className='btn btn-danger w-50 m-auto d-block my-4'>Clear all products</button>
                {numberOfCartItems !== 0? allProductOfCart.map((product,idx)=> <div key={idx} className="row align-items-center mb-2 pb-2 border-bottom">
                    <div className="col-md-1">
                        <figure>
                            <img src={product.product.imageCover} alt="" className='w-100'/>
                        </figure>
                    </div>
                    <div className="col-md-9">
                        <article>
                            <h3>{product.product.title}</h3>
                            <h5>{product.price}</h5>
                            <button onClick={()=> myDeleteProduct(product.product.id)} className='btn btn-outline-danger'>remove</button>
                        </article> 
                    </div>
                    <div className="col-md-2">
                        <div className='d-flex justify-content-between align-items-center'>
                            <button onClick={()=> updateMyProductCount(product.product.id , product.count + 1)} className='btn btn-outline-success'> + </button>
                            <p>{product.count}</p>
                            <button disabled={product.count == 1} onClick={()=> updateMyProductCount(product.product.id , product.count - 1)} className='btn btn-outline-success'> - </button>
                        </div>
                    </div>
                </div>) : <div className='border border-danger text-center py-4 px-3 rounded-3 my-4 w-75 m-auto border-3'>
                    <h2 className='fs-2 fw-bold mb-5'>Not product to show</h2>
                    <button onClick={goToProducts} className='btn btn-success w-50'>Go shopping</button>
                    </div>}
                <button onClick={goToCheckout} disabled={numberOfCartItems == 0} className='btn btn-success w-50 d-block m-auto fw-bolder fs-5'>Checkout</button>
            </div>}
            
        </>
    )
}
