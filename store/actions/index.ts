import { STORE_USER_DATA, STORE_ACCOUNT, STORE_TRX } from "../types";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Trx {
  trxDate: string;
  trxDescription: string;
  trxAmount: number;
}

interface Account {
  accountNumber: string;
  accountName: string;
  accountType: string;
  accountBalance: number;
}
export const storeUserData = (userData: UserData) => {
  return {
    type: STORE_USER_DATA,
    payload: userData,
  };
};

export const storeAccount = (account: Account) => {
  return {
    type: STORE_ACCOUNT,
    payload: account,
  };
};

export const storeTrx = (trx: Trx) => {
  return {
    type: STORE_TRX,
    payload: trx,
  };
};
