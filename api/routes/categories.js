const router = require('express').Router();
const Category = require('../models/Category');

router.post('/', async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCat = await newCategory.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  const cats = await Category.find();
  try {
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
