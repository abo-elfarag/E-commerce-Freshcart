import React from 'react'
import Styles from './ForgotPassword.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    let navigate = useNavigate();
    async function sendEmail(){
        const email = document.getElementById('confirmEmail').value;
        console.log(email)
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
            "email": email
        }).then((res)=>{
            console.log(res)
            navigate('/verifyResetCode')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <>
            <div className="container py-5">
            <div className="form-group w-50 m-auto">
                <label className='fs-4 fw-bold' htmlFor="confirmEmail">Enter your email :</label>
                <input type="email" id='confirmEmail' name='email' className='form-control my-4'/>
                <button onClick={sendEmail} type='submit' className='btn btn-success px-4 fw-bolder'>Send</button>
            </div>
            </div>
        </>
    )
}
