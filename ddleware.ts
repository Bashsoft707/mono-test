import asyncHandler from "./middleware/async";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import User from "./models/user";
import { NextResponse } from "next/server";

interface IUserRequest extends NextApiRequest {
  user: string | null;
}

interface IDecoded {
  id: string;
}

const protect = asyncHandler(
  async (
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
        .json({ error: "Not authorized to access this route" });
    }

    try {
      const decoded = <IDecoded>(
        jwt.verify(token, process.env.JWT_SECRET as string)
      );
      req.user = await User.findById(decoded.id);

      NextResponse.next();
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Not authorized to access this route" });
    }
  }
);

export default protect;
