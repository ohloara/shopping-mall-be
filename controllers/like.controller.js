const LikeList = require("../models/LikeList");

const likeController = {};

likeController.addItemToLikeList = async (req, res)=>{
    try{
        const {userId} = req;
        const { productId } = req.params;
        let likeList = await LikeList.findOne({userId});
        if(!likeList){
            likeList = new LikeList({userId, items:[{productId}]});
            await likeList.save();
        }else{
            likeList.items.push({productId});
        }
        res.status(200).json({status:"success", data:likeList.items});
    }catch(error){
        return res.status(400).json({status:"fail", error:error.message});
    }
}

likeController.deleteItemToLikeList = async (req, res)=>{
    try{
        const {userId} = req;
        const { productId } = req.params;
        let likeList = await LikeList.findOne({userId});
        if (!likeList) {
            return new Error("LikeList not found");
        }
        likeList.items = likeList.items.filter(item => item.productId !== productId);
        res.status(200).json({status:"success", data:likeList.items});
    }catch(error){
        return res.status(400).json({status:"fail", error:error.message});
    }
}

likeController.getLikeList = async (req, res)=>{
    try{
        const {userId} = req;
        let likeList = await LikeList.findOne({userId});
        if (!likeList) {
            return new Error("LikeList not found");
        }
        res.status(200).json({status:"success", data:likeList.items});
    }catch(error){
        return res.status(400).json({status:"fail", error:error.message});
    }
}

module.exports = likeController;