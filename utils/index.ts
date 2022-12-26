import jwt from "jsonwebtoken";
import BANKS from "./banks";

export const signJwt = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const getBankkLogo = (bankCode: string) => {
  const bank = BANKS.find((e) => e.code === bankCode);
  if (bank) return bank.logo;
  return "https://nigerianbanks.xyz/logo/default-image.png";
};
