import asyncHandler from 'express-async-handler'
import EmployeeModel from '../models/employeeModel.js'

export const getEmployee = asyncHandler(async (req, res) => {
  const Employee = await EmployeeModel.find({})
    .sort({ createdAt: -1 })
    .populate('department', ['name'])
  res.json(Employee)
})

export const postEmployee = asyncHandler(async (req, res) => {
  const { name, gender, mobile, department } = req.body
  const emp_id = req.body.emp_id.toUpperCase()
  const user = req.user.id
  const active = req.body.active

  let employee = await EmployeeModel.findOne({ emp_id })

  if (employee) {
    res.status(400)
    throw new Error('Employee already exists')
  }

  employee = new EmployeeModel({
    user,
    emp_id,
    name,
    gender,
    mobile,
    department,
    active,
  })
  const emp = await employee.save()

  if (emp) {
    res.status(201).json(emp)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const putEmployee = asyncHandler(async (req, res) => {
  const { name, gender, mobile, department } = req.body
  const emp_id = req.body.emp_id.toUpperCase()
  const user = req.user.id
  const active = req.body.active

  let employee = await EmployeeModel.findById(req.params.id)

  if (employee) {
    employee.user = user
    employee.emp_id = emp_id
    employee.name = name
    employee.gender = gender
    employee.mobile = mobile
    employee.department = department
    employee.active = active
  }

  const emp = await employee.save()

  if (emp) {
    res.status(201).json(emp)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const deleteEmployee = asyncHandler(async (req, res) => {
  const Employee = await EmployeeModel.findOneAndRemove({
    _id: req.params.id,
  })

  if (Employee) {
    res.json(Employee)
  } else {
    res.status(400)
    throw new Error('Invalid ID')
  }
})
