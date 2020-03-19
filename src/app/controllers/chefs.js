const Chefs = require('../models/Chefs')
const Recipes = require('../models/Recipes')

module.exports = {
    index(req, res) {
        Chefs.all(function(chefs){
            return res.render("chefs/index", {chefs: chefs})
        })
    },
    create(req, res) {
        return res.render("chefs/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }
        Chefs.create(req.body, function (chef) {
            return res.redirect(`/admin/chefs`)
        })
    },
    show(req, res){
        Chefs.find(req.params.id,function(chef){
            Chefs.chefRecipes(chef.id,function(recipes){
                Recipes.chefSelectOptions(function(options){
                    return res.render("chefs/show", { chef, recipes: recipes, chefOptions: options})
                })
            })
        })
    },
    edit(req, res){
        Chefs.find(req.params.id,function(chef){
            return res.render("chefs/edit", {chef} )
        })  
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }
        Chefs.update(req.body, function(){
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res) {
        Chefs.delete(req.body.id,function(){
            return res.redirect("/admin/chefs")
        })   
    }
}