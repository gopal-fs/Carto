import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Invalid Login"
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.payload = payload;
        next();

    } catch (err) {
        console.log(err.message)
        return res.status(401).send({
            success: false,
            message: "Invalid Login"
        });
    }
};