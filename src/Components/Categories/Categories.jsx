import React, { useContext, useEffect, useState } from 'react'
import Styles from './Categories.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import LoaderPage from '../LoaderPage/LoaderPage';
import { CategoryContext } from '../../Context/CategoryContext';
import { useNavigate } from 'react-router-dom';


export default function Categories() {
    const navigate = useNavigate()
    const {subCategory,setSubCategory} = useContext(CategoryContext)
    function goToCategory(name){
        setSubCategory(name);
        navigate('/subCategory');
        
        console.log(subCategory)
    }


    function getAllCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let {isLoading , isError , data , isFetching} = useQuery('allCategories', getAllCategories,)
    return (
        <>
            {isLoading ? <LoaderPage/> : <div className='py-5'>
                <div className="container">
                    <div className="row g-5">
                        {data?.data.data.map(category => <div className="col-md-4">
                            <div onClick={()=> goToCategory(category.name)} className={Styles.categoryCard}>
                                <img src={category.image} alt="" className='w-100 rounded-3' height={300}/>
                                <h2 className='text-center py-3 text-main fw-bold h3'>{category.name}</h2>
                            </div>
                        </div>)}
                        
                    </div>
                </div>
            </div> }
        </>
    )
}
