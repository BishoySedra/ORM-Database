import user from "../../DB/models/user.js";

export async function addUser(req, res) {
    try {
        const { username, email, password, phoneNumber } = req.body;
        const newUser = await user.create({ username, email, password, phoneNumber });
        res.json({ message: `user Added!` });
    } catch (error) {
        res.json({ message: error });
    }
}
