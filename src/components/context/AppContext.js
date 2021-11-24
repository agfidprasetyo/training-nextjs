import React, {useState, useEffect} from 'react'

export const AppContext = React.createContext([
    {},
    ()=>{}
]);

export const AppProvider = (props) => {
    const [cart, setCart] = useState(null);
    useEffect(() => {
        if(process.browser) {
            let cartItem = localStorage.getItem("my-cart");
            cartItem = null !== cartItem ? JSON.parse(cartItem): '';
            setCart(cartItem);
        }
    }, [])

    return(
        <AppContext.Provider value={[cart,setCart]}>
            {props.children}
        </AppContext.Provider>
    )
}