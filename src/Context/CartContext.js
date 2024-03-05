import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { TokenContext } from './TokenContext';
export const cartContext =  createContext();

export default function CartContextProvider( {children} ) {
    const { token } = useContext(TokenContext);
    const [numberOfCartItems , setNumberOfCartItems] = useState(0);
    const [totalCartPrice , setTotalCartPrice] = useState(0);
    const [allProductOfCart , setAllProductOfCart] = useState(null);
    const [cartID , setCartID] = useState(null);
    
    async function addProductToCart(id){
        return await axios.post('https://ecommerce.routemisr.com/api/v1/cart' , {
                "productId": id
        } , {
            headers:{ token: localStorage.getItem('userToken')}
        }).then((res)=>{
            getUserCart();
            toast('Added Successfully', {
                duration:2000 , position:'top-center'
            })
        })
        .catch((err)=>{
            toast.error('Error Occurred', {
                duration:2000 , position:'top-center'
            })
        })
    }

    async function getUserCart(){
         await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers:{ token: localStorage.getItem('userToken')}
        }).then((res)=> {
            setCartID(res.data.data._id)
            
            setAllProductOfCart(res.data.data.products);
            setNumberOfCartItems(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
        })
            .catch((err)=> {
                console.log('err',err)
            })
    }

    async function updateCount(id , newCount){
        const booleanFlag = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            "count": newCount
        }, {
            headers:{
                token: localStorage.getItem('userToken')
            }
        }).then((res)=> {
            setTotalCartPrice(res.data.data.totalCartPrice);
            setNumberOfCartItems(res.data.numOfCartItems);
            setAllProductOfCart(res.data.data.products);
            return true;
        })
        .catch((err)=> {
            console.log(err);
            return false;
        })

        return booleanFlag;
    }

    async function deleteProduct(id){
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
            headers: {token: localStorage.getItem('userToken')}
        }).then((res)=>{
            setTotalCartPrice(res.data.data.totalCartPrice);
            setNumberOfCartItems(res.data.numOfCartItems);
            setAllProductOfCart(res.data.data.products);
            return true;
        })
        .catch((err)=>{
            console.log(err)
            return false;
        })
        return res;
    }

    async function clearAllProduct(){
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers: {token: localStorage.getItem('userToken')}
        }).then((res)=>{
            setTotalCartPrice(0);
            setNumberOfCartItems(0);
            setAllProductOfCart(null);
            
            return true;
        })
        .catch((err)=>{
            console.log(err)
            return false;
        })
        return res;
    }
    
    useEffect(()=>{
        getUserCart()   
    }, [token] )

return (
    <cartContext.Provider value={ {addProductToCart , getUserCart ,numberOfCartItems , totalCartPrice , allProductOfCart , updateCount , deleteProduct , clearAllProduct , cartID , setAllProductOfCart , setNumberOfCartItems , setTotalCartPrice} }>
        {children}
    </cartContext.Provider>
)
}
