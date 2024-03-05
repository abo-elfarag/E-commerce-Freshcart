import React, { useContext, useEffect, useState } from 'react'
import Styles from './Checkout.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default  function Checkout() {
    let navigate = useNavigate();
   useEffect(()=>{
    
   }, [])
    const {cartID , setAllProductOfCart , setNumberOfCartItems , setTotalCartPrice } = useContext(cartContext);
    
    async function confirmCashPayment(values){
        console.log(values , cartID)
        await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}` , values , {
            headers:{
                token: localStorage.getItem('userToken')
            }
        }).then((res)=>{
            if(res.data.status === "success"){
                toast.success('Payment completed successfully')
                navigate('/home')
                setAllProductOfCart(null);
            setNumberOfCartItems(0);
            setTotalCartPrice(0);
            }
        })
        .catch((err)=>{
            toast.error('error to payment')
        })
    }

    async function confirmOnlinePayment(values){
        console.log(values , cartID)
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}` , values , {
            headers:{
                token: localStorage.getItem('userToken')
            },params: { url: 'http://localhost:3000' }
        }).then((res)=>{
            if(res.data.status === "success"){
                console.log(res.data.session.url)
            window.open(res.data.session.url)
            }
        })
        .catch((err)=>{
            // toast.error('error to payment')
        })
    }

    let formik = useFormik({
        initialValues:{
            "details": "",
            "phone": "",
            "city": ""
        },
        onSubmit: confirmCashPayment
    })
    return (
        <>
            <div className="container">
                <div className='mx-auto bg-main-light p-5'>
                    <h2>shipping Address</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="details">Details</label>
                            <input type="text" className='form-control' id='details' name='details' value={formik.values.details} onChange={formik.handleChange}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" className='form-control' id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="city">City</label>
                            <input type="text" className='form-control' id='city' name='city' value={formik.values.city} onChange={formik.handleChange}/>
                        </div>
                        <div className='d-flex'>
                            <button type='submit' onClick={confirmCashPayment} className='btn btn-success w-25  m-auto me-5'>Pay Cash</button>
                            <button type='submit' onClick={confirmOnlinePayment} className='btn btn-success w-25  m-auto'>Pay Online</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
