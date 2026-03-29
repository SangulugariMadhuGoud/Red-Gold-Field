// Profile service - contains business logic for user profile management
import User from "../models/User.js";
import ShippingAddress from "../models/ShippingAddress.js";

const profileService = {
  // Get user profile
  getUserProfile: async (userId) => {
    return await User.findById(userId).select("-password");
  },

  // Update user profile
  updateUserProfile: async (userId, updates) => {
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      select: "-password",
    });

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    return user;
  },

  // Get shipping addresses
  getShippingAddresses: async (userId) => {
    return await ShippingAddress.find({ userId });
  },

  // Add shipping address
  addShippingAddress: async (userId, addressData) => {
    const { isDefault, ...data } = addressData;

    if (isDefault) {
      await ShippingAddress.updateMany({ userId }, { isDefault: false });
    }

    const address = new ShippingAddress({
      userId,
      ...data,
      isDefault,
    });

    await address.save();
    return address;
  },

  // Update shipping address
  updateShippingAddress: async (userId, addressId, addressData) => {
    const { isDefault, ...data } = addressData;

    if (isDefault) {
      await ShippingAddress.updateMany(
        { userId, _id: { $ne: addressId } },
        { isDefault: false },
      );
    }

    const address = await ShippingAddress.findOneAndUpdate(
      { _id: addressId, userId },
      { ...data, isDefault },
      { new: true },
    );

    if (!address) {
      const error = new Error("Address not found");
      error.status = 404;
      throw error;
    }

    return address;
  },

  // Delete shipping address
  deleteShippingAddress: async (userId, addressId) => {
    const address = await ShippingAddress.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!address) {
      const error = new Error("Address not found");
      error.status = 404;
      throw error;
    }

    return address;
  },
};

export default profileService;
