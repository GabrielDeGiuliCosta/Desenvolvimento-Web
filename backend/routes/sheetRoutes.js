const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')

const {
  getSheets,
  createSheet,
  getSheetById,
  updateSheet,
  deleteSheet
} = require('../controllers/sheetController')

const router = express.Router()

router.use(authMiddleware)

router.get('/', getSheets)
router.post('/', createSheet)
router.get('/:id', getSheetById)
router.put('/:id', updateSheet)
router.delete('/:id', deleteSheet)

module.exports = router