import React from 'react'
import Styles from './Footer.module.css'
import AmazonPay from '../../imgs/2560px-Amazon_Pay_logo.svg.png';
import masterCardImg from '../../imgs/pngimg.com - mastercard_PNG16.png';
import PaypalImg from '../../imgs/new-PayPal-Logo-horizontal-full-color-png.png';
import AppStore from '../../imgs/1000_F_376662920_zqGXBodBGhHkUQEFbnHt1FuQSV7stYVi.jpg';

export default function Footer() {
    return (
        <>
            <div className='py-4 px-3 bg-body-secondary'>
                <h2 className='ms-4'>Get the FreshCart app</h2>
                <p className='ms-4'>We will send you a link , open it on your phone to download the app</p>
                <div className='d-flex px-3 justify-content-center'>
                    <input type="email" placeholder='Email...' className='form-control me-3 w-75'/>
                    <button className='btn btn-success px-3 py-2'>Share app link</button>
                </div>
                <div className='d-flex align-items-center justify-content-between px-5'>
                    <div className='d-flex align-items-center my-3 p-3'>
                        <p className='mb-4'>Payment Partners :  </p>
                        <div style={{width:'50px' , height:'50px'}} className='mx-3'>
                            <img src={AmazonPay} alt='' className='w-100'/>
                        </div>
                        <div style={{width:'50px' , height:'50px'}} className='mx-3'>
                            <img src={masterCardImg} alt='' className='w-100'/>
                        </div>
                        <div style={{width:'50px' , height:'50px'}} className='mx-3'>
                            <img src={PaypalImg} alt='' className='w-100'/>
                        </div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <p className='mt-3'>Get deliveries with FreshCart</p>
                        <div style={{width:'150px' , height:'50px'}} className='mx-3'>
                            <img src={AppStore} alt='' className='w-100'/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
