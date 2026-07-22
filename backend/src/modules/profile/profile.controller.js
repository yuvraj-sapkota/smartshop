import {
  getMyProfileService,
  updateMyProfileService,
  changePasswordService,
} from "./profile.service.js";

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await getMyProfileService(req.user._id);
    res.status(200).json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const profile = await updateMyProfileService(
      req.user._id,
      req.body,
      req.user.role,
    );
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await changePasswordService(req.user._id, currentPassword, newPassword);
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
