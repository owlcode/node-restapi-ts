import {UserSeed} from './user'
import mongoose from 'mongoose';
import {MONGO_URL} from '../settings';

const LOAD = 100;
mongoose.connect(MONGO_URL);

UserSeed.clear();
UserSeed.seed(LOAD);

setTimeout(() => {
    console.log('Thanks, owlstd.io');
    process.exit()
}, 1500);
