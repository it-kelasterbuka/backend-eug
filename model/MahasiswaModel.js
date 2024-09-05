import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Mahasiswa = db.define('mhs', {
    npm:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prodi: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName: true
});

export default Mahasiswa;

(async () => {
    try {
        await db.sync({ alter: true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
})();