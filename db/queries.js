const pool = require("./pool");

async function getCategories(){
    const { rows } = await pool.query("SELECT * FROM categories")
    return rows;
}

async function getAllItems(){
    const { rows } = await pool.query("SELECT * FROM items");
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
        brands.name AS brand_name
        FROM items
        JOIN item_categories ON items.id = item_categories.item_id
        JOIN categories ON item_categories.category_id = categories.id
        JOIN brands ON items.brand_id = brands.id
        WHERE categories.id = $1`, [category]);
    return rows;
};

module.exports = {
    getCategories,
    getAllItems,
    getCategoryItems
}