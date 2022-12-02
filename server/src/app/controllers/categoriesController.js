const Category = require("../models/Categories");

class categoriesController {
    // POST
    // path = /api/categories
    categoryCreate = async (req, res) => {
        const newCat = new Category(req.body);
        try {
            const savedCat = await newCat.save();
            res.status(200).json(savedCat);
        } catch (err) {
            res.status(500).json(err);
        }
    };

    // GET
    // path = /api/categories
    categoryGet = async (req, res) => {
        try {
            const cats = await Category.find();
            res.status(200).json(cats);
        } catch (err) {
            res.status(500).json(err);
        }
    };
}

module.exports = new categoriesController();
