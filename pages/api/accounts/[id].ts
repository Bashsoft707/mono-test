import Mono from "../../../lib/mono";
import connect from "../../../lib/config";
import { NextApiRequest, NextApiResponse } from "next";
import asyncHandler from "../../../middleware/async";
import protect from "../../../middleware/auth";
import Account from "../../../models/account";

const mono = new Mono();

const getTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const trx = await mono.getTransactions(id as string);

  res.status(200).json({
    status: "SUCCESS",
    data: {
      trx,
    },
  });
};

const unlinkAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accountId } = req.body;

  await mono.unlinkAccount(accountId);

  const account = await Account.findOne({ accountId });
  await account?.remove();

  return res.status(200).json({
    status: "SUCCESS",
  });
};

const defaultMethod = async (res: NextApiResponse) => {
  return res.status(400).json({ success: false });
};

export default async function AccountApi(
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) {
  protect(req, res);
  connect();

  switch (req.method) {
    case "GET":
      getTransactions(req, res);
      break;
    case "POST":
      unlinkAccount(req, res);
      break;
    default:
      defaultMethod(res);
      break;
  }
}
