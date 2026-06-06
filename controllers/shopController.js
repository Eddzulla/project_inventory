const db = require("../db/queries");

async function getHome(req, res){
    const items = await db.getAllItems();
    res.render("index", {items});
}

async function getCategory(req, res){
    const id = req.params.id; // id of category
    const items = await db.getCategoryItems(id);
    res.render("category", {id, items});
}

async function getItem(req, res){

}

async function getCreateItem(req, res){
    const refererUrl = req.get('Referer');

    if(res.locals.isAdmin){
        let categories = res.locals.categories;
        let brands = res.locals.brands;
        res.render("createItem", {categories, brands});
    }
    else if(refererUrl.endsWith('createItem')){
        res.redirect("/");
    }
    else{
        res.redirect(refererUrl || "/");
    }
}

async function postCreateItem(req, res){
    const item = req.body;
    db.postNewItem(item);

    return res.redirect("/");
}

async function deleteItem(req, res){
    const { id } = req.params;
    db.deleteItem(id);
    return res.redirect("/");
}

module.exports = {
    getHome,
    getCategory,
    getCreateItem,
    postCreateItem,
    deleteItem
}