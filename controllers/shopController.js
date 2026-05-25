const db = require("../db/queries");

async function getHome(req, res){
    const categories =  await db.getCategories(); 
    const items = await db.getAllItems();
    res.render("index", {categories: categories, items: items});

}

async function getCategory(req, res){
    const categories =  await db.getCategories(); 
    const id = req.params.id; // id of category
    const items = await db.getCategoryItems(id);
    console.log(items);
    res.render("category", {categories: categories, id: id, items: items});

}

module.exports = {
    getHome,
    getCategory,
}