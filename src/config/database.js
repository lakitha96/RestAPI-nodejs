import mongoose from 'mongoose';
import constants from './constants';

//Remove the warning with Promise 
mongoose.Promise = global.Promise;

// Connect with db with url provided
try {
    mongoose.connect(constants.MONGO_URL);
} catch (error) {
    mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
    .once('open', () => console.log('MongoDB Running....'))
    .on('error', e => {
        throw e;
    });