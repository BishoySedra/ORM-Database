import bcrypt from 'bcrypt';

async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

export default hashPassword;