import * as fs from 'fs';

export const PORT = 3000;
export const MONGO_URL = 'mongodb://localhost:27017/noderestapi-starter-app';
export const CERT_FILES_FS = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert: fs.readFileSync(__dirname + '/server.crt')
};
export const NODEMAILER_TRANSPORT = {
    service: 'gmail',
    auth: {
        user: '***@gmail.com',
        pass: '***'
    }
};
export const WEBSITE_URI = 'https://localhost:3000';