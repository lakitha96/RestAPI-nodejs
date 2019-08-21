import Passport from "passport";
import LocalStrategy from 'passport-local';

import User from '../modules/users/user.model';
import { passwordReg } from "../modules/users/user.validations";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import constants from '../config/constants';

const localOpts = {
    usernameField: 'email',
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) =>{
    try {
        const user = await User.findOne({email});

        if(!user) {
            return done(null, false);
        } else if(!user.authenticateUser(password)){
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

Passport.use(localStrategy);

export const authLocal = Passport.authenticate('local', { session: false });