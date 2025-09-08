import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not authorized. Login again." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = token_decode.id;  
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// admin access only, should be done with user roles tho @TODO
// const adminMiddleware = (req, res, next) => {
//     console.log(req);
//   if (req.user && req.user.email === process.env.ADMIN_EMAIL) {
//     console.log(req);
//     next();
//   } else {
//     res.status(403).json({ success: false, message: "Admin access required" });
//   }
// };

export {authMiddleware};