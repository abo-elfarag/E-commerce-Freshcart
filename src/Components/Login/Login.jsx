import React, { useContext, useState } from 'react';
import Style from './Login.module.css';
import { useNavigate,Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { TokenContext } from '../../Context/TokenContext';
import { jwtDecode } from 'jwt-decode';


export default function Login() {

    


    let navigate = useNavigate()
    const [errorMessage,setErrorMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const {setToken,getUserData} = useContext(TokenContext);

    async function callLogin(reqBody){
        setErrorMessage('');
        setIsLoading(true);
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',reqBody)
        .catch(err => {
        setIsLoading(false) 
        setErrorMessage(err.response.data.message)});
        if(data.message == 'success'){
            localStorage.setItem('userToken', data.token);
            setToken(data.token);
            setIsLoading(false);
            navigate('/home');
            getUserData();
            
            
            
            
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('email not valid').required('email is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,'invalid password').required('password is required'),
    })

    const loginForm = useFormik({
        initialValues: {
            email:"",
            password:"",
        },
        validationSchema : validationSchema,
        onSubmit: callLogin,
    })


    return (
        <>
            <div className="w-50 mx-auto my-5">
                <h2 className='mb-4'>Login Now : </h2>
                {errorMessage ? (<div className='alert alert-danger'>{errorMessage}</div>) : null}
                
                <form onSubmit={loginForm.handleSubmit}>
                    <div className="form-group mb-4">
                        <label htmlFor="email" className='mb-1'>Email</label>
                        <input type="email" id='email' name='email' value={loginForm.values.email} className='form-control' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur}/>
                        {loginForm.errors.email && loginForm.touched.email ? (<div className='alert alert-danger'>{''}{loginForm.errors.email}</div>) : null}
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="password" className='mb-1'>Password</label>
                        <input type="password" id='password' name='password' value={loginForm.values.password} className='form-control' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur}/>
                        {loginForm.errors.password && loginForm.touched.password ? (<div className='alert alert-danger'>{''}{loginForm.errors.password}</div>) : null}
                    </div>
                    <Link to={'/forgotPassword'} className='ms-auto d-block text-info text-decoration-underline'>Forgot Password ?</Link>
                    <button type='submit' className='btn btn-success text-white d-block ms-auto'>
                        {isLoading ? (<i className='fa fa-spinner fa-spin fs-3'></i>) : "Login"}
                    </button>
                        
                </form>
            </div>
        </>
    )
}

