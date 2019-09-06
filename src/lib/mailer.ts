import * as nodemailer from 'nodemailer'
import {
    NODEMAILER_TRANSPORT
} from '../../settings';
import {
    log
} from '../../seed/utils';

export const mailer = nodemailer.createTransport(NODEMAILER_TRANSPORT);

export interface NewMailParams {
    name: string;
    text: string;
}

export interface OwlMailOptions {
    from: string;
    subject: string;
    text: string;
    html: string;
}

export const sendNewMail = (params: NewMailParams): Promise < string | boolean > => {
    return new Promise((resolve, reject) => {
        mailer.sendMail({
            ...getMailOptions(params)
        }, (err, info) => {
            if (err) {
                log(err);
                reject(err);
            }
            log(info);
            resolve(nodemailer.getTestMessageUrl(info));
        })
    });
};

export const getMailOptions = (params: NewMailParams): OwlMailOptions => {
    return {
        from: '#owlstd.io',
        subject: '✔',
        text: `Hi! ${params.name}`,
        html: `<h2>hi!</h2>${params.text}`
    }
};
