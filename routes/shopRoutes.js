const { Router } = require("express");
const shopController = require("../controllers/shopController");
const adminController = require("../controllers/adminController");
const shopRouter = Router();




shopRouter.get("/", shopController.getHome);
shopRouter.get("/categories/:id", shopController.getCategory);
shopRouter.get("/createItem", shopController.getCreateItem);
shopRouter.post("/createItem", shopController.postCreateItem);
shopRouter.post("/deleteItem/:id", shopController.deleteItem);


shopRouter.get("/toggleAdmin", adminController.toggleAdmin);

module.exports = shopRouter;