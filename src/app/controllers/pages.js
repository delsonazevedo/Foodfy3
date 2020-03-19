const Recipes = require("../models/Recipes")
const Chefs = require("../models/Chefs")

module.exports = {
        index(req, res) {
                return res.render("page/index")
        },
        about(req, res) {
                return res.render("page/about")
        },
        recipes(req, res) {
                /*Recipes.all(function (recipes) {
                        Recipes.chefSelectOptions(function (options) {
                                return res.render("page/recipes", { recipes: recipes, chefOptions: options })
                        })
                })*/
                let { filter, page, limit } = req.query

                page = page || 1
                limit = limit || 6
                let offset = limit * (page - 1)

                const params = {
                        filter,
                        page,
                        limit,
                        offset,
                        callback(recipes) {
                                const pagination = {
                                        total: Math.ceil(recipes[0].total / limit),
                                        page
                                }
                                return res.render("page/recipes", { recipes, pagination, filter })
                        }
                }

                Recipes.paginate(params)
        },
        recipe(req, res) {
                Recipes.find(req.params.index, function (recipe) {
                        if (!recipe) return res.send("Recipe not found!")
                        Recipes.chefSelectOptions(function (options) {
                                return res.render("page/recipe", { recipe, chefOptions: options })
                        })
                })
        },
        chefs(req, res) {
                Chefs.all(function (chefs) {
                        return res.render("page/chefs", { chefs: chefs })
                })
        }
}