import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/config";
import User from "../../../models/user";

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password" });
  }

  try {
    const user = await User.findOne({
      email,
    }).select("+password")

    if (!user) {
      return res.status(422).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.mactchPasswords(password);

    if (!isMatch) {
        return res.status(422).json({ error: "Invalid email or password" });
    }

    const token = await user.getSignedJwtToken();

    res.status(201).json({ message: "logged in successfully", data: user, token });
  } catch (error) {
    return res.status(500).send("error");
  }
};

const defaultMethod = async (res: NextApiResponse) => {
    return res.status(400).json({ success: false });
  };

export default async function Login (req: NextApiRequest, res: NextApiResponse) {
    connect();

    switch (req.method) {
        case "POST":
            signIn(req, res);
            break;
        default:
            defaultMethod(res);
            break;
    }
}