import crypto from 'crypto';

function generateCode() {
    const code = crypto.randomBytes(3).toString('hex');
    return code;
};

export default generateCode;