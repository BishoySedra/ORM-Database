import jwt from "jsonwebtoken";

function decodeToken(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
}

export default decodeToken;