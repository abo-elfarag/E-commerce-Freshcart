

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishListContext = createContext();

export default function WishListContextProvider(props){

    // const [token,setToken] = useState(null)
    const [numberOfWishListItems , setNumberOfWishListItems] = useState(0);
    const [allProductOfWishList , setAllProductOfWishList] = useState(null);
    const [idProducts, setIdProducts] = useState([]);
    
    const extractPropertyValues = () => {
        if (allProductOfWishList.length > 0) {
          const newPropertyValues = allProductOfWishList.map(product => product.id);
          setIdProducts(newPropertyValues);
        }
      };

    

    async function getUserWishList(){
        await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
           headers:{ token: localStorage.getItem('userToken')}
       }).then((res)=> {
        //    setCartID(res.data.data._id)
          
           setAllProductOfWishList(res.data.data);
        setNumberOfWishListItems(res.data.count);
        extractPropertyValues();

        if (allProductOfWishList.length > 0) {
            extractPropertyValues();
          }
        
        // for (let i = 0; i < allProductOfWishList.length; i++) {
            
        //     idArray.push(allProductOfWishList[i].id)
            
        // }
        // console.log(idProducts)
        //    setTotalCartPrice(res.data.data.totalCartPrice);
       })
           .catch((err)=> {
               console.log('err',err)
           })
   }

   async function addProductToWishList(id){
    return await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' , {
            "productId": id
    } , {
        headers:{ token: localStorage.getItem('userToken')}
    }).then((res)=>{
        // getUserCart();
        toast('Added Successfully', {
            duration:2000 , position:'top-center'
        })
    })
    .catch((err)=>{
        toast.error('Error Occurred', {
            duration:2000 , position:'top-center'
        })
    })
    
}

   async function wishListDeleteProduct(id){
    const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , {
        headers: {token: localStorage.getItem('userToken')}
    }).then((res)=>{
        setAllProductOfWishList(res.data.data);
        setNumberOfWishListItems(res.data.count);
        return true;
    })
    .catch((err)=>{
        console.log(err)
        return false;
    })
    return res;
}

useEffect(()=>{
    getUserWishList();
}, [getUserWishList] )

// useEffect(()=>{
    
// }, [idProducts] )

    return <WishListContext.Provider value={{ addProductToWishList , getUserWishList , numberOfWishListItems , allProductOfWishList , wishListDeleteProduct , idProducts}}>
                {props.children}
            </WishListContext.Provider>
}