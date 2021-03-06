const Recipes = require('../models/Recipes')

module.exports = {
    index(req, res) {
        Recipes.all(function (recipes) {
            Recipes.chefSelectOptions(function(options){
                return res.render("admin/index", { recipes: recipes, chefOptions: options })
            })
        })
    },
    show(req, res) {
        Recipes.find(req.params.id, function (recipe) {
            if (!recipe) return res.send("Recipe not found!")
                Recipes.chefSelectOptions(function(options){
                    return res.render("admin/show", { recipe, chefOptions: options })
                })
        })
    },
    create(req, res) {
        Recipes.chefSelectOptions(function(options){
            return res.render("admin/create", {chefOptions: options})
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        Recipes.create(req.body, function (recipe) {
            return res.redirect(`/admin/recipes`)
        })

    },
    edit(req, res) {
        Recipes.find(req.params.id, function (recipe) {
            if (!recipe) return res.send("Recipe not found!")
            Recipes.chefSelectOptions(function(options){
                return res.render("admin/edit", { recipe, chefOptions: options })
            })
        })
        
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        Recipes.update(req.body, function(){
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete(req, res) {
        Recipes.delete(req.body.id, function(){
            return res.redirect('/admin/recipes')
        })
    }
}




