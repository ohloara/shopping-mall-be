const monggose = require('mongoose');
const Schema = monggose.Schema;
const userSchema = Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    name:{type:true,required:true},
    level:{type:String, default:"customer"},
},{timestamps:true});

userSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.password;
    delete obj.__v;
    delete obj.updateAt;
    delete obj.createAt;
    return obj;
}

const User = monggose.model("User", userSchema);
module.exports = User;