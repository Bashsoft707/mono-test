import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/config";
import User from "../../../models/user";

const signUp = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  try {
    const user = await User.findOne({
      email,
    });

    if (user) {
      return res
        .status(422)
        .json({ error: "User already exists with that email" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    const token = await newUser.getSignedJwtToken();
    await newUser.save();
    res
      .status(201)
      .json({ message: "saved successfully", data: newUser, token });
  } catch (error) {
    return res.status(500).send("error");
  }
};

const defaultMethod = async (res: NextApiResponse) => {
  return res.status(400).json({ success: false });
};

const handlers = {
  POST: signUp,
  ["undefined"]: defaultMethod,
};

export default async function SignUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await Promise.all([connect(), handlers[req.method](req, res)]);
}
