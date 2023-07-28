import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const user = sequelize.define('user', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    forgetPasswordCode: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    forgetPasswordCodeVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

export default user;