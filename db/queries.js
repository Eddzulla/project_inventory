const pool = require("./pool");

async function getCategories(){
    const { rows } = await pool.query("SELECT * FROM categories")
    return rows;
}

async function getBrands(){
    const { rows } = await pool.query("SELECT * FROM brands")
    return rows;
}

async function getAllItems(){
    const { rows } = await pool.query(` SELECT DISTINCT
        items.id,
        items.name,
        items.description,
        items.price,
        items.stock,
        brands.name AS brand_name,
        brands.country AS country
        FROM items
        JOIN item_categories ON items.id = item_categories.item_id
        JOIN categories ON item_categories.category_id = categories.id
        JOIN brands ON items.brand_id = brands.id
        ORDER BY items.id`);
    return rows;
}

async function getCategoryItems(category){
    
    const { rows}  = await pool.query(`
        SELECT 
        items.id,
        items.name,
        items.description,
        items.price,
        items.stock,
        brands.name AS brand_name,
        brands.country AS country
        FROM items
        JOIN item_categories ON items.id = item_categories.item_id
        JOIN categories ON item_categories.category_id = categories.id
        JOIN brands ON items.brand_id = brands.id
        WHERE categories.id = $1`, [category]);
    return rows;
};

async function postNewItem(item){
    if(item.category_id == undefined){
        console.log("No category id selected!");
        return;
    }

    const { rows } = await pool.query("INSERT INTO items (name, description, price, stock, brand_id) VALUES ($1, $2, $3, $4, $5) RETURNING id", 
        [item.name, item.description, item.price, item.stock, item.brand_id]);
    
    const newItemId = rows[0].id;
    const categoryIds = Array.isArray(item.category_id) // in case of multiple categories
    ? item.category_id 
    : [item.category_id];

    for(const catId of categoryIds){
        await pool.query("INSERT INTO item_categories (item_id, category_id) VALUES ($1, $2)", 
            [newItemId, catId]);
    }
    return;
}

async function deleteItem(id){
    console.log(id)
    await pool.query("DELETE FROM items WHERE id=($1)", [id]);
    return;
}

module.exports = {
    getCategories,
    getAllItems,
    getCategoryItems,
    getBrands,
    postNewItem,
    deleteItem
}