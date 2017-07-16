let faker = require('faker');
import User from '../../api/user/user.model';

export default class UserSeed {
    static clear() {
        User.remove({})
        .then(() => {});
    }
    static seed(load : number) {
        faker.locale = 'pl';

        for (let i = 0; i < load; i++) {
            var model = {
                name: faker.name.firstName(),
                surname: faker.name.findName(),
                usernname: faker.internet.userName(),
                photo: faker.image.people(),
                birth: faker.date.past(),
                status: faker.random.number(),
                id: faker.finance.bic(),
                phone: faker.phone.phoneNumber(),
            };
            
            User.create(model)
            .then(() => {});
        }

        console.log('Added ' + load + ' users like ', model);
    }
}
