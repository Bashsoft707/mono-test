import axios from "axios";
import { URL } from "../constant";

export const LinkAccount = async (payload: any) => {
  try {
    const token = window.localStorage.getItem("token");
    const res = await axios.post(`${URL}/accounts`, payload, {
      headers: { authorization: `Bearer ${token}` },
    });
    const reseult = { success: true, ...res.data };
    console.log(reseult);
    return { success: true, ...res.data };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      message: (error as any).response?.data?.message || (error as any).message,
    };
  }
};

export const getAccounts = async () => {
  try {
    const token = window.localStorage.getItem("token");
    const res = await axios.get(`${URL}/accounts`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const data = res.data;
    return { success: true, data };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      message: (error as any).response?.data?.message || (error as any).message,
    };
  }
};

export const getTrx = async (id: string) => {
  try {
    const token = window.localStorage.getItem("token");
    const res = await axios.get(`${URL}/accounts/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return { success: true, ...res.data };
  } catch (error) {
    return {
      success: false,
      message: (error as any).response?.data?.message || (error as any).message,
    };
  }
};

export const unlinkAccount = async (accountId: string) => {
  try {
    const token = window.localStorage.getItem("token");
    const res = await axios.post(
      `${URL}/accounts/${accountId}`,
      { accountId },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return { success: true, ...res.data };
  } catch (error) {
    return {
      success: false,
      message: (error as any).response?.data?.message || (error as any).message,
    };
  }
};
