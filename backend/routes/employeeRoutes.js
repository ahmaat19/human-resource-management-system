import express from 'express'
import {
  deleteEmployee,
  getEmployee,
  postEmployee,
  putEmployee,
} from '../controllers/employeeController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, postEmployee).get(protect, getEmployee)
router.route('/:id').delete(protect, deleteEmployee).get(protect, putEmployee)

export default router
