import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('task_3', 'root', 'Bishoy@123', {
    host: 'localhost',
    dialect: 'mysql'
});

export async function connectionDB() {
    try {
        // const result = await sequelize.sync({ alter: true });
        console.log('DataBase Connected!');
    } catch (error) {
        console.log(error);
    }
}