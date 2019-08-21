import Joi from 'joi';

export const passwordReg = /^(?!.*(.)\1{3})((?=.*[\d])(?=.*[A-Za-z])|(?=.*[^\w\d\s])(?=.*[A-Za-z])).{8,20}$/;
export default {
    signup:{
        email: Joi.string().email().required(),
        password: Joi.string().regex(passwordReg),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userName: Joi.string().required()
    }
}