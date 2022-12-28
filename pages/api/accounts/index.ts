import Mono from "../../../lib/mono";
import connect from "../../../lib/config";
import Account from "../../../models/account";
import { NextApiRequest, NextApiResponse } from "next";
import { getBankkLogo } from "../../../utils";
import asyncHandler from "../../../middleware/async";
import protect from "../../../middleware/auth";

const mono = new Mono();

const linkAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.body;
  const { user } = req as any;

  console.log("user", user);
  console.log("code", code);

  const id = await mono.exchangeToken(code);
  const account = await mono.getAccount(id);
  const { _id, institution, balance } = account;
  const logo = getBankkLogo(institution.bankCode);

  const isAccount = await Account.findOne({ bankName: institution.name });

  if (isAccount) {
    return res.status(200).json({
      status: "SUCCESS",
    });
  }

  const data = await Account.create({
    userId: user._id,
    accoutId: _id,
    balance,
    bankName: institution.name,
    bankLogo: logo,
  });

  return res.status(200).json({
    status: "SUCCESS",
    data,
  });
};

const unlinkAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accountId } = req.body;

  await mono.unlinkAccount(accountId);
  await Account.deleteOne({ accountId });

  return res.status(200).json({
    status: "SUCCESS",
  });
};

const getAccounts = asyncHandler(async (req: NextApiRequest, res: NextApiResponse, next: any) => {
  
  const { user } = req as any;

  // if (!user) {
  //   return res.status(401).json({
  //     status: "FAILED",
  //     message: "Unauthorized",
  //   });
  // }
  
  console.log("users 1", user)

  const accounts = await Account.find({ user: user });

  return res.status(200).json({
    status: "SUCCESS",
    data: accounts,
  });
})
;

const defaultMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("defaultMethod", req.method);
  return res.status(400).json({ success: false });
};

const handlers = {
  POST: linkAccount,
  GET: getAccounts,
  DELETE: unlinkAccount,
  ["undefined"]: defaultMethod,
};

export default async function AccountApi(
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) {
  protect(req, res, next)
  console.log("req.user 2")
  await Promise.all([connect(), handlers[req.method](req, res)]);
}
