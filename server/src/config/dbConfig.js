import { Sequelize } from 'sequelize';
import fs from 'fs';

const sequelize = new Sequelize('eden-rose', 'edenrose', 'NhapmonCNPM@123', {
    host: 'eden-rose.mysql.database.azure.com',
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync('./src/config/DigiCertGlobalRootCA.crt.pem')
        }
    }
});

export default sequelize;
