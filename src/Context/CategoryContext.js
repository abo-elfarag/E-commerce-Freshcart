import { createContext, useState } from "react";

export let CategoryContext = createContext();


export default function CategoryContextProvider(props){

    const [subCategory,setSubCategory] = useState(null);


    

    return <CategoryContext.Provider value={{subCategory,setSubCategory}}>
                {props.children}
            </CategoryContext.Provider>
}