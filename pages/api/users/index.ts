import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/config";
import User from "../../../models/user";

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    const users = await User.find();

    const {user} = req as any
    console.log((user));

    res.status(200).json({ success: true, data: users });
}

const defaultMethod = async (res: NextApiResponse) => {
    return res.status(400).json({ success: false });
  };

const handlers = {
    GET: getUsers,
    ["undefined"]: defaultMethod
}

export default async function UserApi (req: NextApiRequest, res: NextApiResponse) {
    await Promise.all([connect(), handlers[req.method](req, res)])
}
