import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import { signInUser } from "../api/user";
import ERRORMSG from "../components/shared/error";
import Loader from "../components/shared/loader";
import { selectUserState, setUserState } from "../store/slices/user-slice";

const SignIn = () => {
  //state hooks
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState(false);

  const dispatch = useDispatch();

  const currentUser = useSelector(selectUserState);

  useEffect(() => {
    if (currentUser?._id) Router.push("/home");
  }, [reload]);

  const [formData, setFormData] = useState({ password: "", email: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const data = await signInUser(formData);
      setLoading(false);

      if (!data.success) {
        handleError(data.message);
        return;
      }

      window.localStorage.setItem("token", data?.token);

      dispatch(setUserState(data?.data));
      setReload(!reload);
    } catch (error) {
      console.log({ error });
    }
  };
  const handleError = (msg: string) => {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 5000);
  };
  return (
    <div className="h-screen flex items-center justify-center  bg-[#101010]">
      {loading && <Loader />}
      <div className="flex flex-col pb-6 py-4 px-12 sm:px-32 sm:pb-16 sm:py-4 h-auto justify-center items-center rounded-2xl  bg-[#FFFFFF]">
        {error && <ERRORMSG message={error} />}
        <div className="flex flex-col gap-4 p-12 items-center justify-center">
          <img
            src="https://monoassets.com/f/118499/x/53bf3c69fd/logo.svg"
            alt="mono-logo"
            className="w-44"
          />
          <p className="text-sm font-light text-[#101010] opacity-70">
            Securely login to your account
          </p>
        </div>

        <form className="bg-white w-full" onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full py-4">
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="w-full py-4">
            <input
              onChange={(e) => handleChange(e)}
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              minLength={4}
            />
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                className="bg-gray-200 hover:bg-gray-300 
    border-3 border-amber-500 focus:outline-none rounded-lg
                cursor-pointer mr-1 text-orange-500  text-xs checked:bg-slate-50 w-6 h-6 outline-none indeterminate:bg-white default:ring-2 shadow drop-shadow-lg"
                type="checkBox"
                name="rememberme"
                id="rememberme"
                style={{
                  background: "black",
                  color: "red",
                  border: "none",
                }}
              />
              <span className="text-xs font-light opacity-70 font-sans">
                Remember me
              </span>
            </div>
            <span className="text-xs font-light opacity-70 font-sans cursor-pointer">
              I forgot my password
            </span>
          </div>
          <button
            type="submit"
            className="shadow-lg drop-shadow-lg w-full bg-[#182CD1] hover:bg-[#6979F8] my-4 py-3 uppercase text-md rounded-md text-white font-light"
          >
            log in
          </button>
          <div className="flex w-full font-light justify-center items-center text-[#182CD1]">
            <p className="mt-4 text-xs self-center">
              {" "}
              Don't have an account?{" "}
              <span className="cursor-pointer text-xs font-light text-[#182CD1] underline">
                {" "}
                <Link href="/register"> Sign up</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
