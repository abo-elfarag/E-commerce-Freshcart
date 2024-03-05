import React, { useState } from 'react';
import Styles from './Register.module.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [errorMessage,setErrorMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    async function callRegister(reqBody){
        setErrorMessage('');
        setIsLoading(true);
        const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',reqBody)
        .catch(err =>{
            setIsLoading(false)
            setErrorMessage(err.response.data.message)})
        console.log(data);
        if(data.message == 'success'){
            navigate('/login')
        }
    }
    const validationSchema = Yup.object({
        name: Yup.string().min(3,"name is too short").max(10,'name is too long').required('name is required'),
        email: Yup.string().email('email not valid').required('email is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,'invalid password').required('password is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')],'password and repassword should be match').required('repassword is required'),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/,'invalid phone').required('invalid phone'),
    })
    const registerForm = useFormik({
        initialValues:{
            name:"",
            email:"",
            phone:"",
            password:"",
            rePassword:""
        },
        validationSchema,
        onSubmit:callRegister
    })
    return (
        <>
            <div className="w-50 mx-auto my-5">
                <h2 className='mb-4'>Register Now : </h2>
                {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div>:null}
                <form onSubmit={registerForm.handleSubmit}>
                    <div className="form-group mb-4">
                        <label htmlFor="name" className='mb-1'>Full Name</label>
                        <input type="text" id='name' value={registerForm.values.name} name='name'  className='form-control' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
                        {registerForm.errors.name && registerForm.touched.name ? (<div className='alert alert-danger'>{''}{registerForm.errors.name}</div>) : null}
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="email" className='mb-1'>Email</label>
                        <input type="email" id='email' name='email' className='form-control' value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
                        {registerForm.errors.email && registerForm.touched.email ? (<div className='alert alert-danger'>{''}{registerForm.errors.email}</div>) : null}
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="phone" className='mb-1'>Phone</label>
                        <input type="tel" id='phone' name='phone' className='form-control' value={registerForm.values.phone} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
                        {registerForm.errors.phone && registerForm.touched.phone ? (<div className='alert alert-danger'>{''}{registerForm.errors.phone}</div>) : null}
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="password" className='mb-1'>Password</label>
                        <input type="password" id='password' name='password'  className='form-control' value={registerForm.values.password} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
                        {registerForm.errors.password && registerForm.touched.password ? (<div className='alert alert-danger'>{''}{registerForm.errors.password}</div>) : null}
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="rePassword" className='mb-1'>Repassword</label>
                        <input type="password" id='rePassword' name='rePassword' className='form-control' value={registerForm.values.rePassword} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
                        {registerForm.errors.rePassword && registerForm.touched.rePassword ? (<div className='alert alert-danger'>{''}{registerForm.errors.rePassword}</div>) : null}
                    </div>
                    <button type='submit' className='btn btn-success text-white d-block ms-auto px-4' disabled={!(registerForm.isValid && registerForm.dirty)}>
                        {isLoading ? (<i className='fa fa-spinner fa-spin fs-3'></i>) : "Register"}
                    </button>
                </form>
            </div>
        </>
    )
}
