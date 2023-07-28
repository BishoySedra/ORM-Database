import jwt from 'jsonwebtoken';

function createToken(email) {
    return jwt.sign({ email }, process.env.TOKEN_SECRET_KEY);
}

export default createToken;