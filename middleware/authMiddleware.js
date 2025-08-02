import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

class AuthMiddleware {
  async isAuthenticated(req, res, next) {
    const token = req.headers.authorization;
    if (!token || token == undefined) {
      res.status(403).json({
        message: "Please Login",
      });
      return;
    }
    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        res.status(403).json({
          message: "Invalid Token",
        });
        return;
      }
      try {
        const userData = await User.findById(decoded.id);
        if (!userData) {
          res.status(404).json({
            message: "No user found with that token",
          });
          return;
        }
        req.user = userData;

        next();
      } catch (error) {
        res.status(500).json({
          message: "Something went wronggg",
        });
      }
    });
  }
}

export default new AuthMiddleware();
