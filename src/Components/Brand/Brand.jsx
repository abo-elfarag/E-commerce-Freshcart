import React, { useContext } from 'react'
import Styles from './Brand.module.css'
import { useQuery } from 'react-query';
import axios from 'axios';
import LoaderPage from '../LoaderPage/LoaderPage';
import { useNavigate } from 'react-router-dom';
import { BrandContext } from '../../Context/BrandContext';

export default function Brand() {
    const navigate = useNavigate()
    const {subBrand,setSubBrand} = useContext(BrandContext)

    async function goToBrand(name){
        navigate('/subBrand')
        await setSubBrand(name)
        console.log(subBrand)
    }


    function getAllBrands(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }
    let {isLoading , isError , data , isFetching} = useQuery('allBrands', getAllBrands,)
    return (
        <>
            {isLoading ? <LoaderPage/> : <div className='py-5'>
                <div className="container">
                    <div className="row g-5">
                        {data?.data.data.map(brand => <div className="col-md-4">
                            <div onClick={()=> goToBrand(brand.name)} className={Styles.brandCard}>
                                <img src={brand.image} alt="" className='w-100 rounded-3' height={300}/>
                                <h2 className='text-center py-3 text-main fw-bold h3'>{brand.name}</h2>
                            </div>
                        </div>)}
                        
                    </div>
                </div>
            </div> }
        </>
    )
}
