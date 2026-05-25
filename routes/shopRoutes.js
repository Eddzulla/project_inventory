const { Router } = require("express");
const shopController = require("../controllers/shopController");
const shopRouter = Router();

shopRouter.get("/", shopController.getHome);
shopRouter.get("/categories/:id", shopController.getCategory);
//shopRouter.get(":category/:id", shopController.getItem);

module.exports = shopRouter;