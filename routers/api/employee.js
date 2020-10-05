const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Employee = require('../../models/Employee');

// @route    GET api/employees
// @desc     Get all employees
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const employee = await Employee.find()
      .sort({ date: -1 })
      .populate('department', ['name'])
      .populate('user', ['name']);
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/employee
// @desc     Create employee
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('emp_id', 'Employee ID is required').not().isEmpty(),
      check('name', 'Employee is required').not().isEmpty(),
      check('gender', 'Gender is required').not().isEmpty(),
      check('mobile', 'Mobile is required').not().isEmpty(),
      check('department', 'Department is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, gender, mobile, department } = req.body;
    const emp_id = req.body.emp_id.toUpperCase();
    const user = req.user.id;

    try {
      let employee = await Employee.findOne({ emp_id });

      if (employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Employee ID already exists' }] });
      }

      employee = new Employee({
        user,
        emp_id,
        name,
        gender,
        mobile,
        department,
      });
      await employee.save();

      return res
        .status(200)
        .json(
          await Employee.find()
            .sort({ date: -1 })
            .populate('department', ['name'])
            .populate('user', ['name'])
        );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    PUT api/employee/:id
// @desc     Update employee
// @access   Private
router.put(
  '/:id',
  [
    auth,
    checkObjectId('id'),
    [
      check('emp_id', 'Employee ID is required').not().isEmpty(),
      check('name', 'Employee is required').not().isEmpty(),
      check('gender', 'Gender is required').not().isEmpty(),
      check('mobile', 'Mobile is required').not().isEmpty(),
      check('department', 'Department is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, gender, mobile, department } = req.body;
    const emp_id = req.body.emp_id.toUpperCase();
    const user = req.user.id;

    try {
      // let employee_id = await Employee.findOne({ _id: req.params.id });

      // if (employee_id) {
      //   return res
      //     .status(400)
      //     .json({ errors: [{ msg: 'Employee ID already exists' }] });
      // }

      let employee = await Employee.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { user, emp_id, name, gender, mobile, department } }
      );

      return res
        .status(200)
        .json(
          await Employee.find()
            .sort({ date: -1 })
            .populate('department', ['name'])
            .populate('user', ['name'])
        );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/employee
// @desc     Delete employee
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const employee = await Employee.findOneAndRemove({
      _id: req.params.id,
    });

    return res
      .status(200)
      .json(
        await Employee.find()
          .sort({ date: -1 })
          .populate('department', ['name'])
          .populate('user', ['name'])
      );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
