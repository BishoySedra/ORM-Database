import user from "../DB/models/user.js";
import hashPassword from "../helpers/hashing.js";
import generateCode from "../helpers/generateCode.js";
import sendEmail from "../services/emailSending.js";
import createToken from "../helpers/createToken.js";
import decodeToken from "../helpers/decodeToken.js";

export async function addUser(req, res) {
    try {

        const foundUser = await user.findOne({ where: req.body });

        if (foundUser) {
            return res.json({ message: "User already found!" });
        }

        const { user_name, password, phone_number, email } = req.body;
        const hashedPassword = await hashPassword(password);
        const newUser = await user.create({ user_name, phone_number, email, password: hashedPassword });

        if (newUser) {
            return res.json({ message: "User Added!" });
        }

    } catch (error) {

        res.json({ message: error });

    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const deletedUser = await user.destroy({ where: { id } });
        if (!deletedUser) {
            return res.json({ message: "No User Found to delete!" });
        }

        res.json({ message: "User Deleted!" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export async function forgetPassword(req, res) {
    try {
        console.log("I'm Here!!");
        const { email } = req.body;

        // check email in database
        const foundUser = await user.findOne({ where: { email } });
        if (!foundUser) {
            return res.json({ message: 'Invalid Credentials' });
        }


        const code = generateCode();
        const updatedUser = await user.update({ forgetPasswordCode: code }, { where: { email } });

        const html = `<h1>${code}</h1>`;
        await sendEmail(email, `6-digit code`, `code to verify forget password`, html);

        const token = createToken(email);

        res.json({ message: `check your email!!`, auth_token: token });
    } catch (error) {
        res.json({ message: error });
    }
}

export async function verifyForgetPassword(req, res) {
    try {

        const { auth_token } = req.headers;
        const { code } = req.body;
        const decodedData = decodeToken(auth_token);

        // check if it is invalid token or not
        if (!decodedData.email) {
            return res.json({ message: "Invalid Token!" });
        }

        const { email } = decodedData;

        const foundUser = await user.findOne({ where: { email } });

        // check if this user already found in database 
        if (!foundUser) {
            return res.json({ message: "Invalid Email!" });
        }

        // check if this user have requested forget-password request
        if (!foundUser.forgetPasswordCode) {
            return res.json({ message: "Invalid Credentials!" });
        }

        // check if the code provided matched with the one existed in database
        if (foundUser.forgetPasswordCode !== code) {
            return res.json({ message: "Invalid Verification Code!" });
        }

        const token = createToken(email);

        if (foundUser.forgetPasswordCodeVerified) {
            return res.json({ message: "You have already verified your email!", auth_token: token });
        }

        const updatedUser = await user.update({ forgetPasswordCodeVerified: true }, { where: { email } });


        res.json({ message: `You have Verified forget-password request successfully!`, auth_token: token });

    } catch (error) {
        res.json({ message: error });
    }
}

export async function changePassword(req, res) {
    try {

        const { newPassword, confirmPassword } = req.body;
        const { auth_token } = req.headers;
        const decodedData = decodeToken(auth_token);

        // check if it is invalid token or not
        if (!decodedData.email) {
            return res.json({ message: "Invalid Token!" });
        }

        const { email } = decodedData;

        const foundUser = await user.findOne({ where: { email } });

        // check if this user already found in database 
        if (!foundUser) {
            return res.json({ message: "Invalid Credentials!" });
        }

        // check if the newPassword and confirmPassword are matched or not
        if (newPassword != confirmPassword) {
            return res.json({ message: "Two Passwords aren't matched!" });
        }

        // check if the user is verified to change the password or not
        if (!foundUser.forgetPasswordCodeVerified) {
            return res.json({ message: "You're not verified to change your password!" });
        }

        const hashedNewPassword = await hashPassword(newPassword);

        const updatedUser = user.update(
            {
                password: hashedNewPassword,
                forgetPasswordCode: null,
                forgetPasswordCodeVerified: false
            },
            { where: { email } }
        );

        res.json({ message: "You have changed your password successfully!" });

    } catch (error) {
        res.json({ message: error });
    }
}


