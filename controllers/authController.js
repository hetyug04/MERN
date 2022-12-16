import {
  BadRequestError,
  UnauthenticatedError,
} from "../errorPackage/index.js";
import User from "../models/User.js";
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    if (!firstName || !lastName || !userName || !email || !password) {
      throw new BadRequestError("Please Provide All Values");
    }
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      throw new BadRequestError("Email In Use");
    }
    const user = await User.create(req.body);
    const token = user.createJWT();
    res.json({
      user: {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
        __v: user.__v,
      },
      token,
    });
    console.log("register");
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Please Provide All Values");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthenticatedError("Invalid Email");
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    const token = await user.createJWT();
    user.password = undefined;
    res.json({
      user: {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
        __v: user.__v,
      },
      token,
    });
    console.log("login success");
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res) => {
  res.send("Update");
};

export { register, login, updateUser };
