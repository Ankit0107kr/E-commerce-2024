import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET || "ankit0107kr"
    );
    req.user = decode;
    // console.log(decode)={ _id: '6660cf7e552317c7c6e86752', iat: 1717672012, exp: 1718276812 }
    //in req obj we added new key user and valur decode
    // console.log(req.user) ==
    // { _id: "6660cf7e552317c7c6e86752", iat: 1717672012, exp: 1718276812 };
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
