import passport from "passport";
import LocalStrategy from 'passport-local';

import User from '../modules/users/user.model';
import constants from '../config/constants';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';


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

//jwt stragety
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: constants.JWT_SECRET,
}

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
    try {
        const user = await User.findById(payload._id);
        if(!user){
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(e, false);
    }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
