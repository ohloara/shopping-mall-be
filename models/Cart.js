const monggose = require('mongoose');
const User = require("./User");
const Product = require("./Product");
const Schema = monggose.Schema;
const cartSchema = Schema({
    userId:{type:monggose.Schema.Types.ObjectId, ref:User},
    items:[{
        productId:{type:monggose.Schema.Types.ObjectId, ref:Product},
        size:{type:String, required:true},
        qty:{type:Number, default:1, required:true}
    }]
},{timestamps:true});

cartSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.__v;
    delete obj.updateAt;
    delete obj.createAt;
    return obj;
}

const Cart = monggose.model("Cart", cartSchema);
module.exports = Cart;