import axios from "axios";
import CONSTANT from "../constant";

const URL = CONSTANT.BASE_URL;
export const signInUser = async (payload: any) => {
    try {
        const res = await axios.post(`${URL}/auth/login`, payload);
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

export const signUpUser = async (payload: any) => {
    try {
        const res = await axios.post(`${URL}/auth/signup`, payload);
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
export const deleteUser = async () => {
    try {
        const token = window.localStorage.getItem("token");
        const res = await axios.delete(`${URL}/users`, {
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