const mealModel = require('../models/meal.model')

module.exports = {
  getMenuAPI: async (req, res) => {
    const meals = await mealModel.find()
    return res.json(meals)
  }
}
