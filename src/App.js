
import './App.css';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Categories from './Components/Categories/Categories';
import Cart from './Components/Cart/Cart';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { useContext, useEffect } from 'react';
import { TokenContext } from './Context/TokenContext';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import Products from './Components/Products/Products';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Checkout from './Components/Checkout/Checkout';
import SubCategory from './Components/SubCategory/SubCategory';
import { Toaster } from 'react-hot-toast';
import Brand from './Components/Brand/Brand';
import SubBrand from './Components/SubBrand/SubBrand';
import WishList from './Components/WishList/WishList';
import VerifyResetCode from './Components/VerifyResetCode/VerifyResetCode';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import MyOrder from './Components/MyOrder/MyOrder';
import Notfound from './Components/Notfound/Notfound';


function App() {
  let {setToken} = useContext(TokenContext);
  const routes = createBrowserRouter([
    {path:"",element:<Layout/> , children:[
      {path:"home",element:<Home/>},
      {path:"/",element:<Home/>},
      {path:"cart",element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path:"wishList",element:<ProtectedRoutes><WishList/></ProtectedRoutes>},
      {path:"checkout",element:<ProtectedRoutes><Checkout/></ProtectedRoutes>},
      {path:"myOrder",element:<ProtectedRoutes><MyOrder/></ProtectedRoutes>},
      {path:"register",element:<Register/>},
      {path:"verifyResetCode",element:<ProtectedRoutes><VerifyResetCode/></ProtectedRoutes>},
      {path:"resetPassword",element:<ProtectedRoutes><ResetPassword/></ProtectedRoutes>},
      {path:"forgotPassword",element:<ProtectedRoutes><ForgotPassword/></ProtectedRoutes>},
      {path:"login",element:<Login/>},
      {path:"categories",element:<Categories/>},
      {path:"brand",element:<Brand/>},
      {path:"products",element:<Products/>},
      {path:"subCategory",element:<SubCategory/>},
      {path:"subBrand",element:<SubBrand/>},
      {path:"productdetails/:id",element:<ProductDetails/>},

      {path:"*",element:<Notfound/>},
    ]}
  ])

  useEffect(()=>{
    if(localStorage.getItem('userToken') != null){
      setToken(localStorage.getItem('userToken'));
    }
  },[])
  return (
    <>
      
      <RouterProvider router={routes}></RouterProvider>
      <Toaster/>
    </>
  );
}

export default App;
