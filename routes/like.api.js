const express = require("express");
const authController = require("../controllers/auth.controller");
const likeController = require("../controllers/like.controller");
const router = express.Router();

router.post("/:productId", authController.authenticate, likeController.addItemToLikeList);
router.delete("/:productId", authController.authenticate, likeController.deleteItemToLikeList);
router.get("/", authController.authenticate, likeController.getLikeList);

module.exports = router;