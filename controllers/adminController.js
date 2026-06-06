let isAdmin = false;

function toggleAdmin(req, res){
    isAdmin = !isAdmin;
    console.log(isAdmin)
    res.redirect(req.get('Referer') || "/");
} 

function getAdmin(){
    return isAdmin;
}

module.exports = {
    toggleAdmin,
    getAdmin
}