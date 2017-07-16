import UserSeed from './user';
import mongoose = require('mongoose');
import ArticleSeed from "./article";
import QuestSeed from "./quest";
import CommentSeed from "./comment";
import TalkSeed from "./talk";
import MessageSeed from "./message";

const LOAD = 10;
mongoose.connect('mongodb://localhost:27017/pomocny');

UserSeed.clear();
UserSeed.seed(LOAD);

CommentSeed.clear();
CommentSeed.seed(LOAD);

ArticleSeed.clear();
ArticleSeed.seed(LOAD);

QuestSeed.clear();
QuestSeed.seed(LOAD);

TalkSeed.clear();
TalkSeed.seed(LOAD);

MessageSeed.clear();
MessageSeed.seed(LOAD);
