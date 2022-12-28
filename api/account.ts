import axios from "axios";
import CONSTANT from "../constant";

const URL = CONSTANT.BASE_URL;
export const LinkAccount = async (payload: any) => {
    try {
        const token = window.localStorage.getItem("token");
        const res = await axios.post(`${URL}/accounts/link`, payload, {
            headers: { authorization: `Bearer ${token}` },
        });
        return { success: true, ...res.data };
    } catch (error) {
        return {
            success: false,
            message:
                (error as any).response?.data?.message ||
                (error as any).message,
        };
    }
};

export const getAccounts = async () => {
    try {
        const token = window.localStorage.getItem("token");
        const res = await axios.get(`${URL}/accounts`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return { success: true, ...res.data };
    } catch (error) {
        return {
            success: false,
            message:
                (error as any).response?.data?.message ||
                (error as any).message,
        };
    }
};

export const getTrx = async (id: string) => {
    try {
        const token = window.localStorage.getItem("token");
        const res = await axios.get(`${URL}/accounts/${id}/transactions`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return { success: true, ...res.data };
    } catch (error) {
        return {
            success: false,
            message:
                (error as any).response?.data?.message ||
                (error as any).message,
        };
    }
};

export const unlinkAccount = async (accountId: string) => {
    try {
        const token = window.localStorage.getItem("token");
        const res = await axios.post(
            `${URL}/accounts/unlink`,
            { accountId },
            {
                headers: { authorization: `Bearer ${token}` },
            }
        );
        return { success: true, ...res.data };
    } catch (error) {
        return {
            success: false,
            message:
                (error as any).response?.data?.message ||
                (error as any).message,
        };
    }
};