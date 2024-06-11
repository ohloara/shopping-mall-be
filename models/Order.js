const monggose = require("mongoose");
const User = require("./User");
const Product = require("./Product");
const Schema = monggose.Schema;
const orderSchema = Schema({
    shipTo:{type:Object, required:true},
    contact:{type:Object, required:true},
    totalPrice:{type:Number, required:true, default:0},
    userId:{type:monggose.Schema.Types.ObjectId, ref:User},
    status:{type:String, default:"preparing"},
    items:[{
        productId:{type:monggose.Schema.Types.ObjectId, ref:Product},
        qty:{type:Number, required:true, default:1},
        size:{type:String, required:true},
        price:{type:Number, required:true}
    }]

},{timestamp:true});

orderSchema.method.toJSON = function(){
    const obj = this._doc;
    delete obj.__v;
    delete obj.updateAt;
    delete obj.createAt;
    return obj;
};

const Order = monggose.model("Order", orderSchema);

module.exports = Order;