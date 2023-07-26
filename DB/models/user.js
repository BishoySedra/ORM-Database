import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const user = sequelize.define('user', {
    username: {
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
    phoneNumber: {
        type: DataTypes.STRING,
        unique: true
    },
    forgetPasswordCode: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    forgetPasswordCodeVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

export default user;