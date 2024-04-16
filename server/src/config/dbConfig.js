import mysql from 'mysql2';
import fs from 'fs'; 

const pool = mysql.createPool({
    host: 'eden-rose.mysql.database.azure.com',
    user: 'edenrose',
    password: 'NhapmonCNPM@123',
    database: 'eden-rose',
    ssl: {
        ca: fs.readFileSync('./src/config/DigiCertGlobalRootCA.crt.pem')
    }
});
export default pool;
