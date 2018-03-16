import {User, IUser} from '../src/api/user/user.model';
import {log} from './utils';
import {Promise} from 'ts-promise';

const faker = require('faker');

export class UserSeed {
    static clear() {
        User.remove({})
            .then(log);
    }

    static seed(load: number) {
        faker.locale = 'pl';

        for (let i = 0; i < load; i++) {
            var model = UserSeed.fakerModel(i);
            User.create(model)
                .then(log);
        }

        Promise.all(UserSeed.realData().map(u => User.create(u)))
            .then(cbs => log({m: 'Real static data created'}));

        console.log('Added ' + load + ' users like ', model);
    }

    private static realData(): IUser[] {
        return <any> [{
            userName: 'dawid',
            firstName: 'Dawid',
            lastName: 'Sowa',
            password: 'dawid',
            mail: 'sowa@dawidsowa.pl',
            spot: null,
        }, {
            userName: 'admin',
            password: 'admin',
            firstName: 'Administrator',
            lastName: 'Systemu',
            mail: 'sowa@dawidsowa.pl',
            spot: 'A1'
        }]
    }
    private static fakerModel(i: number): IUser {
        let userName = faker.internet.userName();
        return <any> {
            mail: 'sowa@dawidsowa.pl',
            firstName: faker.name.firstName(),
            lastName: faker.name.findName(),
            userName,
            photo: faker.image.people(),
            spot: (i % 3 === 0) ? 'A' + i : null,
            password: faker.random.number(),
            phone: faker.phone.phoneNumber(),
        }
    }
}
