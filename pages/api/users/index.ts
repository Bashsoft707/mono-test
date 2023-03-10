import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/config";
import protect from "../../../middleware/auth";
import User from "../../../models/user";

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    const users = await User.find().select("-password");

    res.status(200).json({ success: true, data: users });
}

const defaultMethod = async (res: NextApiResponse) => {
    return res.status(400).json({ success: false });
  };

export default async function UserApi (req: NextApiRequest, res: NextApiResponse) {
    protect(req, res)
    connect();

    switch (req.method) {
        case "GET":
            getUsers(req, res);
            break;
        default:
            defaultMethod(res);
            break;
    }
}
