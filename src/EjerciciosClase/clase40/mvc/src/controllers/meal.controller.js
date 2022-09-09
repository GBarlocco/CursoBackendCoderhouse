const mealModel = require('../models/meal.model')

module.exports = {
  getMenuController: async (req, res) => {
    const meals = await mealModel.find()
    return res.render('menu', { meals })
  }
}
