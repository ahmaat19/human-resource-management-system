const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Discount = require('../../models/Discount');

// @route    GET api/discount
// @desc     Get all discounts
// @access   Private
router.get('/', async (req, res) => {
  try {
    const discount = await Discount.find()
      .sort({ date: -1 })
      .populate('department', ['name']);
    res.json(discount);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/discount
// @desc     Create discount
// @access   Private
router.post(
  '/',
  [[check('empId', 'Employee ID is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const empId = req.body.empId.toUpperCase();
    const {
      empName,
      department,
      fatherName,
      motherName,
      isSingle,
      isMale,
      wives,
      husband,
      hasChildren,
      children,
    } = req.body;

    try {
      let discount = await Discount.findOne({ empId });

      if (discount) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Employee ID already exists' }] });
      }

      discount = new Discount({
        empId,
        empName,
        department,
        fatherName,
        motherName,
        isSingle,
        isMale,
        wives: Array.isArray(wives)
          ? wives
          : wives.split(',').map((wife) => ' ' + wife.trim()),
        husband,
        hasChildren,
        children: Array.isArray(children)
          ? children
          : children.split(',').map((child) => ' ' + child.trim()),
      });
      await discount.save();

      return res
        .status(200)
        .json(
          await Discount.find()
            .sort({ date: -1 })
            .populate('department', ['name'])
        );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    PUT api/discount
// @desc     Update discount
// @access   Private
router.put(
  '/:id',
  [
    auth,
    checkObjectId('id'),
    [check('empId', 'Employee ID is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const empId = req.body.empId.toUpperCase();

    const {
      empName,
      department,
      fatherName,
      motherName,
      isSingle,
      isMale,
      wives,
      husband,
      hasChildren,
      children,
    } = req.body;

    try {
      let discount = await Discount.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            empId,
            empName,
            department,
            fatherName,
            motherName,
            isSingle,
            isMale,
            wives: Array.isArray(wives)
              ? wives
              : wives.split(',').map((wife) => ' ' + wife.trim()),
            husband,
            hasChildren,
            children: Array.isArray(children)
              ? children
              : children.split(',').map((child) => ' ' + child.trim()),
          },
        }
      );

      return res
        .status(200)
        .json(
          await Discount.find()
            .sort({ date: -1 })
            .populate('department', ['name'])
        );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/discount
// @desc     Delete discount
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const discount = await Discount.findOneAndRemove({
      _id: req.params.id,
    });

    return res
      .status(200)
      .json(
        await Discount.find()
          .sort({ date: -1 })
          .populate('department', ['name'])
      );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
