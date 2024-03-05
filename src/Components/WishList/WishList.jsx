import React, { useContext, useEffect } from 'react'
import Styles from './WishList.module.css'
import { WishListContext } from '../../Context/WishListContext'
import { useQuery } from 'react-query'
import LoaderPage from '../LoaderPage/LoaderPage'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function WishList() {
    const navigate = useNavigate()
    function goToProducts(){
        navigate('/products')
    }

    const {getUserWishList , allProductOfWishList , numberOfWishListItems , wishListDeleteProduct} = useContext(WishListContext)
    let {isLoading , isError , data , isFetching} = useQuery('productsOfWishList', getUserWishList,{
        cacheTime:120000
    })

    async function deleteProductFromWishList(id){
        const res = await wishListDeleteProduct(id)
        if(res){
            toast.success('product is deleted successfully.', {position: 'top-center'})
        }else{
            toast.error('Error...', {position: 'top-center'})
        }
    }
    useEffect(()=>{
        getUserWishList()
    },[])
    return (
        <>
            {isLoading ? <LoaderPage/> : <div className="container">
                <h2 className='mb-4'>Your Wish List</h2>
                <h4 className='mb-5'>Count of items : {numberOfWishListItems}</h4>
                {/* <button disabled={numberOfWishListItems == 0} onClick={ clearAllProduct} className='btn btn-danger w-50 m-auto d-block my-4'>Clear Wish List</button> */}
                {numberOfWishListItems !== 0? allProductOfWishList.map((product,idx)=> <div key={idx} className="row align-items-center mb-2 pb-2 border-bottom">
                    <div className="col-md-1">
                        <figure>
                            <img src={product.imageCover} alt="" className='w-100'/>
                        </figure>
                    </div>
                    <div className="col-md-9">
                        <article>
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <h5>{product.price}</h5>
                            <button onClick={()=> deleteProductFromWishList(product.id)} className='btn btn-outline-danger'>remove</button>
                        </article> 
                    </div>
                    <div className="col-md-2">
                        <div className='d-flex justify-content-between align-items-center'>
                            <button className='btn btn-success w-100'>+ Add to cart</button>
                        </div>
                    </div>
                </div>) : <div className='border border-danger text-center py-4 px-3 rounded-3 my-4 w-75 m-auto border-3'>
                    <h2 className='fs-2 fw-bold mb-5'>Not product to show</h2>
                    <button onClick={goToProducts} className='btn btn-success w-50'>Go shopping</button>
                    </div>}
            </div>}
        </>
    )
}
