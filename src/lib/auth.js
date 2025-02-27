import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const generateToken = (payload) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        return null;
    }
}