require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

module.exports = {
    development: {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        logging: false,
    }
};