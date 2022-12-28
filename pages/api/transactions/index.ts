import Mono from "../../../lib/mono";
import connect from "../../../lib/config";
import Account from "../../../models/account";
import { NextApiRequest, NextApiResponse } from "next";
import { getBankkLogo } from "../../../utils";
import asyncHandler from "../../../middleware/async";
import protect from "../../../ddleware";

const mono = new Mono();
protect;

const getTransactions = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    const trx = await mono.getTransactions(id);

    res.status(200).json({
      status: "SUCCESS",
      data: {
        trx,
      },
    });
  }
);

const defaultMethod = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(400).json({ success: false });
  }
);

const handlers = {
  GET: getTransactions,

  ["undefined"]: defaultMethod,
};

export default async function AccountApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await Promise.all([connect(), handlers[req.method](req, res)]);
}
