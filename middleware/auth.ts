import asyncHandler from "./async";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../models/user";
import { NextResponse } from "next/server";

interface IUserRequest extends NextApiRequest {
  user: string | null;
}

interface IDecoded {
  id: string;
}

const protect =  (
    req: IUserRequest,
    res: NextApiResponse,
  ) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ error: "Not authorized to access this route 1" });
    }

    try {
      const decoded = <IDecoded>(
        jwt.verify(token, process.env.JWT_SECRET as string)
      );

      if (!decoded) {
        return res
          .status(401)
          .json({ error: "Not authorized to access this route 3" });
      }

      req.user = decoded.id;

      // req.user = await User.findById(decoded.id);

      console.log('req.user', req.user)

      
    } catch (error) {
      console.log('11111111111111111111111')
      return res
        .status(401)
        .json({ error: "Not authorized to access this route 2" });
    }
  }

export default protect;
