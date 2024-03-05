import React, { useContext } from 'react'
import Styles from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logoImg from '../../imgs/freshcart-logo.svg'
import { TokenContext } from '../../Context/TokenContext'
import { cartContext } from '../../Context/CartContext'
import userImg from '../../imgs/download.png'

export default function Navbar() {
  let {numberOfCartItems} = useContext(cartContext)
    const {token , setToken} = useContext(TokenContext);
    const navigate = useNavigate();
    
    function logout(){
      localStorage.removeItem('userToken');
      setToken(null);
      navigate('/login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary pt-3">
  <div className="container-fluid">
    <Link className="navbar-brand ms-5" to="/home">
      <img src={logoImg} alt="logo photo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {token ? <>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categories">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/brand">Brands</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/wishList">Wish List</Link>
          </li>
      </ul>
      </> : null}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center ">
        <li className="nav-item me-3">
            <i className="fa-brands fa-facebook mx-1"></i>
            <i className="fa-brands fa-twitter mx-1"></i>
            <i className="fa-brands fa-instagram mx-1"></i>
            <i className="fa-brands fa-tiktok mx-1"></i>
            <i className="fa-brands fa-youtube mx-1"></i>
        </li>
          {token ? <>
            <li className="nav-item position-relative me-3">
            <Link className="nav-link" to="/cart"><i class="fa-solid fa-cart-shopping fs-5 text-main"></i></Link>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {numberOfCartItems !== 0 ? numberOfCartItems : null}
            </span>
          </li>
          <li class="nav-item dropdown">
          <Link class="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <figure className={Styles.profileTab}>
              <img src={userImg} alt="" className='w-100 h-100'/>
            </figure>
          </Link>
          <ul class={' dropdown-menu ' + Styles.dropdownStyle}>
            <li><Link class="dropdown-item" to="/myOrder">My order</Link></li>
            <li><Link class="dropdown-item" to="">Personal info</Link></li>
            <li><Link class="dropdown-item" to="">Change password</Link></li>
            <li><Link class="dropdown-item" to="">Add address</Link></li>
            {/* <li><hr class="dropdown-divider"></li> */}
            
          </ul>
        </li>
            <li className="nav-item">
              <span className="nav-link cursor-pointer" onClick={logout}>Logout</span>
            </li>
          </> : <>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="register">Register</Link>
          </li>
          </>}
      </ul>
    </div>
  </div>
</nav>
        </>
    )
}
