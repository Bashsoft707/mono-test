import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/config";
import protect from "../../../middleware/auth";
import User from "../../../models/user";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const user = await User.findById(id).select("-password");

  if (!user) {
    return res.status(404).json({ success: false });
  }

  res.status(200).json({ success: true, data: user });
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const user = await User.findById(id).select("-password");

  if (!user) {
    return res.status(404).json({ success: false });
  }

  user.set(req.body);

  await user.save();

  res.status(200).json({ success: true, data: user });
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ success: false });
  }

  await user.remove();

  res.status(200).json({ success: true, data: {} });
};

const defaultMethod = async (res: NextApiResponse) => {
    return res.status(400).json({ success: false });
    };


export default async function UserApi (req: NextApiRequest, res: NextApiResponse) {
  protect(req, res)
  connect();

  switch (req.method) {
    case "GET":
      getUser(req, res);
      break;
    case "PUT":
      updateUser(req, res);
      break;
    case "DELETE":
      deleteUser(req, res);
      break;
    default:
      defaultMethod(res);
      break;
  }
}