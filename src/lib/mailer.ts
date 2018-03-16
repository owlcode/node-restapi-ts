import * as nodemailer from 'nodemailer'
import {NODEMAILER_TRANSPORT, WEBSITE_URI} from '../../settings';
import {IUser} from '../api/user/user.model';
import {log} from '../../seed/utils';

export const mailer = nodemailer.createTransport(NODEMAILER_TRANSPORT);

export const sendNewMail = (params): Promise<string | boolean> => {
    return new Promise((resolve, reject) => {
        mailer.sendMail({...getMailOptions(params)}, (err, info) => {
            if (err) {
                log(err);
                reject(err);
            }
            log(info);
            resolve(nodemailer.getTestMessageUrl(info));
        })
    });
};

const getMailOptions = (params: any) => {
    return {
        from: '#owlstd.io',
        subject: '✔',
        text: `Hi! ${params}`,
        html: `<h2>hi!</h2>${params}`
    }
};
