import express from 'express';
import constants from './config/constants';
import './config/database';
import midleWaresConfig from './config/middlewares';
import apiRoutes from './modules';

const app = express();
const PORT = constants.PORT;
midleWaresConfig(app);
apiRoutes(app);

app.get('/health', (req, res) => {
    res.send('Server is up...');
});

app.listen(PORT, err => {
    if(err){
        throw err;
    } else {
        console.log(
        `
        Server running on port : ${PORT}
        ---------
        Running on ${process.env.NODE_ENV}
        `
        );
    }
});