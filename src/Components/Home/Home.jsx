import React, { useEffect, useState } from 'react'
import Styles from './Home.module.css'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import LoaderPage from '../LoaderPage/LoaderPage'
import axios from 'axios'
import Products from '../Products/Products'

export default function Home() {
    const [allProducts,setAllProducts] = useState([])
    async function getAllProducts(){
        axios.get('https://ecommerce.routemisr.com/api/v1/products')
        .then((res)=>{
            setAllProducts(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    useEffect(()=>{
        getAllProducts()
    },[])
    return (
        <>
        <div className='px-5 py-3 mb-5'>
            <MainSlider />
        </div>
        <div className='mb-5'>
            <CategorySlider/>
        </div>
        <Products/>
        <div>
        </div>
        </>
    )
}
