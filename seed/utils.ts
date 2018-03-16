import {User} from '../src/api/user/user.model';
import {Promise} from 'ts-promise';

export const randomUser = (condition: any = {}) => {
    return new Promise(((resolve, reject) => {
        User.count(condition).exec((err: any, count: any) => {
            const random = Math.floor(Math.random() * count);
            console.log('\r\n\r\n', random, count);

            User.findOne().skip(random).exec((err: any, result: any) => {
                if (err) {
                    fatalError(err);
                }

                console.log('\r\n', result);
                console.log('\r\n');
                resolve(result);
            });
        })
    }))

};


export const log = (s: any) => {
    console.log('[' + Date.now() + ']', JSON.stringify(s));
};

export const fatalError = (s: any) => {
    console.error('#ERROR# [' + Date.now() + ']', JSON.stringify(s));
    process.exit(-1);
};

