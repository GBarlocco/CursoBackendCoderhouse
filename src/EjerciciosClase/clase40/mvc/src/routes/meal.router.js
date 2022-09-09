const express = require('express')
const mealsController = require('../controllers/meal.controller')
const mealsAPI = require('../api/meal.api')

const router = express.Router()

router.get('/menu', mealsController.getMenuController) // HTML ON WIRE
router.get('/api/menu', mealsAPI.getMenuAPI) // DATA ON WIRE

module.exports = router
