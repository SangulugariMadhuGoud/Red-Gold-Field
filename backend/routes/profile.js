const express = require('express');
const User = require('../models/User');
const ShippingAddress = require('../models/ShippingAddress');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/', auth, async (req, res) => {
  const { fullName, phone } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { fullName, phone },
      { new: true, select: '-password' }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get shipping addresses
router.get('/addresses', auth, async (req, res) => {
  try {
    const addresses = await ShippingAddress.find({ userId: req.user.userId });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add shipping address
router.post('/addresses', auth, async (req, res) => {
  const { fullName, phone, addressLine1, addressLine2, city, state, pincode, isDefault } = req.body;

  try {
    if (isDefault) {
      await ShippingAddress.updateMany({ userId: req.user.userId }, { isDefault: false });
    }

    const address = new ShippingAddress({
      userId: req.user.userId,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      isDefault,
    });

    await address.save();
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update shipping address
router.put('/addresses/:id', auth, async (req, res) => {
  const { fullName, phone, addressLine1, addressLine2, city, state, pincode, isDefault } = req.body;

  try {
    if (isDefault) {
      await ShippingAddress.updateMany(
        { userId: req.user.userId, _id: { $ne: req.params.id } },
        { isDefault: false }
      );
    }

    const address = await ShippingAddress.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { fullName, phone, addressLine1, addressLine2, city, state, pincode, isDefault },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json(address);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete shipping address
router.delete('/addresses/:id', auth, async (req, res) => {
  try {
    const address = await ShippingAddress.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json({ message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;