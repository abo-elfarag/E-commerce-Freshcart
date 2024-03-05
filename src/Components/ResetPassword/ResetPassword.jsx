import React from 'react'
import Styles from './ResetPassword.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    let navigate = useNavigate()
    async function setNewPassword(){
        const email = document.getElementById('yourEmail').value;
        const newPassword = document.getElementById('newPassword').value;
        console.log(email , newPassword)
        await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
            "email": email,
            "newPassword": newPassword
        }).then((res)=>{
            console.log("yes")
            navigate('/login')
        })
        .catch((err)=>{
            console.log("no")
        })
    }
    return (
        <>
            <div className="container py-5">
            <form className='w-50 m-auto'>
                <div className="form-group">
                    <label htmlFor="yourEmail">Enter your email</label>
                    <input type="email" id='yourEmail' name='yourEmail' className='form-control w-100 my-4'/>
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">Enter new password</label>
                    <input type="text" id='newPassword' name='newPassword' className='form-control w-100 my-4'/>
                </div>
                <button onClick={setNewPassword} type='submit' className='btn btn-success w-50 d-block m-auto'>Change password</button>
            </form>
            </div>
        </>
    )
}
