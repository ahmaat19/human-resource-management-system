import asyncHandler from 'express-async-handler'
import EmployeeModel from '../models/employeeModel.js'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

export const getEmployee = asyncHandler(async (req, res) => {
  const Employee = await EmployeeModel.find({})
    .sort({ createdAt: -1 })
    .populate('department', ['name'])
    .populate('position', ['name'])
  res.json(Employee)
})

export const postEmployee = asyncHandler(async (req, res) => {
  const {
    employeeName,
    gender,
    mobile,
    employmentType,
    hiredDate,
    national,
    birthday,
    position,
    address,
    email,
    department,
  } = req.body
  const employeeId = req.body.employeeId.toUpperCase()
  const user = req.user.id
  const document = req.files.document

  console.log(req.files)

  const documentExt = document.name.slice(-4)
  const documentName = `${document.name.slice(
    0,
    -4
  )}-${Date.now()}${documentExt}`
  const documentPath = `/uploads/${documentName}`

  let employee = await EmployeeModel.findOne({ employeeId })

  if (employee) {
    res.status(400)
    throw new Error('Employee already exists')
  }

  document.mv(path.join(__dirname, documentPath), (err) => {
    if (err) {
      res.status(500)
      throw new Error(err)
    }
  })

  const documentData = {
    documentName,
    documentPath,
  }

  employee = new EmployeeModel({
    user,
    employeeId,
    employeeName,
    gender,
    mobile,
    employmentType,
    hiredDate,
    national,
    birthday,
    position,
    address,
    email,
    department,
    active: true,
    document: documentData,
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
