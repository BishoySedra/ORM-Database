import user from "../../DB/models/user.js";
import bcrypt from 'bcrypt';
import sendEmail from "../../services/sendingEmail.js";

export async function addUser(req, res) {
    try {

        const { username, email, password, phoneNumber } = req.body;

        // if user already registered
        const foundUser = await user.findOne({ where: { email } });

        if (foundUser) {
            return res.json({ message: `user already registered!` });
        }

        // Hash Password using Bcrypt Algorithm
        let hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({ username, email, password: hashedPassword, phoneNumber });

        const html = `<a href = "https://www.google.com">Confirm Email!</a>`;
        await sendEmail(email, ``, ``, html);

        res.json({ message: `user Added and you have received an email to activate!` });

    } catch (error) {

        res.json({ message: error });

    }
}

export async function deleteUser(req, res) {
    try {

        const { id } = req.params;
        const deleteUser = await user.destroy({ where: { id } });

        if (deleteUser) {
            res.json({ message: `user Deleted!` });
        } else {
            res.json({ message: `No User Just Found!` });
        }

    } catch (error) {

        res.json({ message: error });

    }
}

