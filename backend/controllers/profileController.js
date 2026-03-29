// Profile controller - handles request/response logic for profile endpoints
import profileService from "../services/profileService.js";

const profileController = {
  // Get user profile
  getUserProfile: async (req, res) => {
    try {
      const user = await profileService.getUserProfile(req.user.userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  // Update user profile
  updateUserProfile: async (req, res) => {
    const { fullName, phone } = req.body;

    try {
      const user = await profileService.updateUserProfile(req.user.userId, {
        fullName,
        phone,
      });
      res.json(user);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Get shipping addresses
  getShippingAddresses: async (req, res) => {
    try {
      const addresses = await profileService.getShippingAddresses(
        req.user.userId,
      );
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  // Add shipping address
  addShippingAddress: async (req, res) => {
    const {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      isDefault,
    } = req.body;

    try {
      const address = await profileService.addShippingAddress(req.user.userId, {
        fullName,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        isDefault,
      });
      res.status(201).json(address);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update shipping address
  updateShippingAddress: async (req, res) => {
    const {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      isDefault,
    } = req.body;

    try {
      const address = await profileService.updateShippingAddress(
        req.user.userId,
        req.params.id,
        {
          fullName,
          phone,
          addressLine1,
          addressLine2,
          city,
          state,
          pincode,
          isDefault,
        },
      );
      res.json(address);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Delete shipping address
  deleteShippingAddress: async (req, res) => {
    try {
      await profileService.deleteShippingAddress(
        req.user.userId,
        req.params.id,
      );
      res.json({ message: "Address deleted" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },
};

export default profileController;
