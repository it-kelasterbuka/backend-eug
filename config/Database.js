import { Sequelize } from "sequelize";

const db = new Sequelize('db_curd', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

(async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default db;
