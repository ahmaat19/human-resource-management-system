const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Department = require('../../models/Department');

// @route    GET api/departments
// @desc     Get all departments
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const department = await Department.find().sort({ date: -1 });
    res.json(department);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/department
// @desc     Create department
// @access   Private
router.post(
  '/',
  [auth, [check('name', 'Department is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const name = req.body.name;
    const user = req.user.id;

    try {
      let department = await Department.findOne({ name });

      if (department) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Department already exists' }] });
      }

      department = new Department({
        user,
        name,
      });
      await department.save();

      return res.status(200).json(await Department.find().sort({ date: -1 }));
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    PUT api/department
// @desc     Update department
// @access   Private
router.put(
  '/:id',
  [
    auth,
    checkObjectId('id'),
    [check('name', 'Department is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const name = req.body.name;
    const user = req.user.id;
    const id = req.params.id;

    try {
      let department = await Department.findOneAndUpdate(
        { _id: id },
        { $set: { user: user, name: name } }
      );

      return res.status(200).json(await Department.find().sort({ date: -1 }));
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/department
// @desc     Delete department
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const department = await Department.findOneAndRemove({
      _id: req.params.id,
    });

    return res.status(200).json(await Department.find().sort({ date: -1 }));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
