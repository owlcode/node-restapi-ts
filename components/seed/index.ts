import UserSeed from './user';
import mongoose = require('mongoose');

const LOAD = 10;
// todo refactor to use external settings
mongoose.connect('mongodb://localhost:27017/pomocny');

UserSeed.clear();
UserSeed.seed(LOAD);

