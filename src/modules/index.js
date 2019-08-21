import userRoutes from './users/user.routes';
import { authJwt } from '../services/auth.services';

export default app => {
    app.use('/api/v1/users', userRoutes);
    app.get('/api/v1/hello', authJwt, (req, res) => {
        //console.log(auth);
        res.send('private route...!');
    });
};