import userModel from "../models/userModel.js"

//add items to the user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        if (!userData) return res.json({ success: false, message: "User not found" });

        let cartData = userData.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


//remove items from the user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId); 
        if (!userData) return res.json({ success: false, message: "User not found" });

        const cartData = userData.cartData || {};

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({ success: true, message: "Removed from cart", cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


//fetch the user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let cartData = userData.cartData || {};  
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


export {addToCart, removeFromCart, getCart}



