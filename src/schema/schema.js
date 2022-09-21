const joi=require('joi');

const userSchema= joi.object(
    {
        id: joi.string().required(),
        login:joi.string().required(),
        password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,20}$/)).required(),
        age: joi.number().integer().min(4).max(130).required(),
        isDeleted:joi.boolean().required()
    }
)
module.exports=userSchema;