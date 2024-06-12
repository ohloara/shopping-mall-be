const monggose = require("mongoose");
const User = require("./User");
const Cart = require("./Cart");
const Product = require("./Product");
const Schema = monggose.Schema;
const orderSchema = Schema({
    shipTo:{type:Object, required:true},
    contact:{type:Object, required:true},
    totalPrice:{type:Number, required:true, default:0},
    userId:{type:monggose.Schema.Types.ObjectId, ref:User},
    status:{type:String, default:"preparing"},
    orderNum:{type:String},
    items:[{
        productId:{type:monggose.Schema.Types.ObjectId, ref:Product},
        qty:{type:Number, required:true, default:1},
        size:{type:String, required:true},
        price:{type:Number, required:true}
    }]

},{timestamps:true});

orderSchema.method.toJSON = function(){
    const obj = this._doc;
    delete obj.__v;
    delete obj.updateAt;
    return obj;
};

orderSchema.post("save", async function(){
    const cart = await Cart.findOne({userId:this.userId});
    cart.items = [];
    await cart.save(); 
})

const Order = monggose.model("Order", orderSchema);
module.exports = Order;