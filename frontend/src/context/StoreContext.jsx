import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const url = import.meta.env.VITE_API_URL;

    const [token, setToken] = useState(()=>{
        return localStorage.getItem("token") || "";
    });

    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if (token) {
            await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}});
        }
    }


const removeFromCart = async (itemId) => {
    if (!cartItems[itemId]) return;

    const newCart = { ...cartItems };
    newCart[itemId] -= 1;
    if (newCart[itemId] === 0) delete newCart[itemId];
    setCartItems(newCart);

    if (token) {
        const response = await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        if (response.data.cartData) setCartItems(response.data.cartData);
    }
};


    const getTotalCartAmount = () => {
        let totalAmout = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmout += itemInfo.price * cartItems[item];
            }
        }
        return totalAmout;
    }

    const fetchFoodList = async ()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);

    }

const loadCartData = async (token) => {
    try {
        const response = await axios.get(url + "/api/cart/get", { headers: { token } });
        if (response.data.success) {
            setCartItems(response.data.cartData);
        } else {
            setCartItems({});
        }
    } catch (err) {
        console.error("Failed to load cart data:", err);
        setCartItems({});
    }
};

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart, 
        getTotalCartAmount, 
        url, 
        token, 
        setToken, 
        loadCartData
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider