const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Leave = require('../../models/Leave');

// @route    GET api/leave
// @desc     Get all leave
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const leave = await Leave.find()
      .sort({ date: -1 })
      .populate('employee', ['emp_id', 'name'])
      .populate('user', ['name']);
    res.json(leave);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/leave
// @desc     Create leave
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('employee', 'Employee is required').not().isEmpty(),
      check('leave', 'Leave Type is required').not().isEmpty(),
      check(
        'start_date',
        'Start date is required and needs to be from the past'
      )
        .not()
        .isEmpty()
        .custom((value, { req }) =>
          req.body.end_date ? value < req.body.end_date : true
        ),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { employee, leave, start_date, end_date, description } = req.body;
    const user = req.user.id;

    try {
      let leaveRequest = new Leave({
        user,
        employee,
        leave,
        gender,
        start_date,
        end_date,
        description,
      });
      await leaveRequest.save();

      return res
        .status(200)
        .json(
          await Leave.findOne({ _id: leaveRequest._id })
            .sort({ date: -1 })
            .populate('employee', ['emp_id', 'name'])
            .populate('user', ['name'])
        );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    PUT api/leave/:id
// @desc     Update leave
// @access   Private
router.put(
  '/:id',
  [
    auth,
    checkObjectId('id'),
    [
      check('employee', 'Employee is required').not().isEmpty(),
      check('leave', 'Leave Type is required').not().isEmpty(),
      check(
        'start_date',
        'Start date is required and needs to be from the past'
      )
        .not()
        .isEmpty()
        .custom((value, { req }) =>
          req.body.end_date ? value < req.body.end_date : true
        ),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { employee, leave, start_date, end_date, description } = req.body;
    const user = req.user.id;

    try {
      let leaveRequest = await Leave.findOneAndUpdate(
        { _id: id },
        { $set: { user, employee, leave, start_date, end_date, description } }
      );

      return res
        .status(200)
        .json(
          await Leave.findOne({ _id: leaveRequest._id })
            .sort({ date: -1 })
            .populate('employee', ['emp_id', 'name'])
            .populate('user', ['name'])
        );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/leave
// @desc     Delete leave
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const leave = await Leave.findOneAndRemove({
      _id: req.params.id,
    });

    return res
      .status(200)
      .json(
        await Leave.findOne({ _id: req.params.id })
          .sort({ date: -1 })
          .populate('employee', ['emp_id', 'name'])
          .populate('user', ['name'])
      );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
