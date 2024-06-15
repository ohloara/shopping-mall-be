const monggose = require('mongoose');
const User = require("./User");
const Product = require("./Product");
const Schema = monggose.Schema;
const likeListSchema = Schema({
    userId:{type:monggose.Schema.Types.ObjectId, ref:User},
    items:[{
        productId:{type:monggose.Schema.Types.ObjectId, ref:Product}
    }]
},{timestamps:true});

likeListSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.__v;
    delete obj.updateAt;
    delete obj.createAt;
    return obj;
}

const LikeList = monggose.model("LikeList", likeListSchema);
module.exports = LikeList;