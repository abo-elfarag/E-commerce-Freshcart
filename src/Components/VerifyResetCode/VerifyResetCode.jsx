import React from 'react'
import Styles from './VerifyResetCode.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerifyResetCode() {
    let navigate = useNavigate()
    async function sendCode(){
        const verifyCode = document.getElementById('verifyCode').value;
        console.log(verifyCode)
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
            "resetCode": verifyCode
        }).then((res)=>{
            console.log(res)
            navigate('/resetPassword')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <>
            <div className="container py-5">
            <div className='p-5 border border-3 border-success rounded-3 w-75 m-auto'>
                <label htmlFor="verifyCode">Please enter the Verify Reset Code</label>
                <input type="text" id='verifyCode' name='verifyCode' className='form-control my-4'/>
                <button type='submit' onClick={sendCode} className='btn btn-success w-50 d-block m-auto'>Send Code</button>
            </div>
            </div>
        </>
    )
}
