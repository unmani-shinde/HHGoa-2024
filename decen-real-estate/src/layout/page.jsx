import { useEffect, useRef } from "react";

export default function LayoutPage({children}) {

    const loading = useRef();

    useEffect(()=>{
        loading.current = true
    },[])

    return(
        loading.current?(<>Page Loading!</>):(children)
    )
    
    
}