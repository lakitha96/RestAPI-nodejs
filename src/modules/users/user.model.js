import mongoose, { schema, Schema } from 'mongoose';
import validator from 'validator';
import { passwordReg } from './user.validations';
import { hashSync, compareSync } from 'bcrypt-nodejs';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required.'],
        trim: true,
        validate: {
            validator(email){
                return validator.isEmail(email);
            },
            message: '{VALUE} is not a valid email',
        },
    },
    userName: {
        type: String,
        required: [true, 'UserName is required!'],
        trim: true,
    },
    firstName: {
        type: String,
        required: [true, 'FirstName is required!'],
        trim: true,
    },
    lastName:{
        type: String,
        required: [true, 'LastName is required!'], 
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minlength: [6, 'Password need to be longer!'],
        validate: {
            validator(password){
                return passwordReg.test(password);
            },
            message: '{VALUE} is not a valid password!',
        }
    }
});

UserSchema.pre('save', function (next){
    if(this.isModified('password')){
        this.password = this._hashPassword(this.password);  
        return next();            
    }
    return next();
})

UserSchema.methods = {
    _hashPassword(password){
        return hashSync(password);
    },
    authenticateUser(password){
        return compareSync(password, this.password);
    }
};

export default mongoose.model('User', UserSchema);