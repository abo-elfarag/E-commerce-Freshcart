

import { createContext, useState } from "react";

export let BrandContext = createContext();

export default function BrandContextProvider(props){
    const [subBrand,setSubBrand] = useState(null)

    return <BrandContext.Provider value={{subBrand,setSubBrand}}>
                {props.children}
            </BrandContext.Provider>
}