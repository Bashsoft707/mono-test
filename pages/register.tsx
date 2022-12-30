import { ChangeEvent, FormEvent, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { signUpUser } from "../api/user";
import ERRORMSG from "../components/shared/error";
import Loader from "../components/shared/loader";
import Image from "next/image";

const SignUp = () => {
  //form data
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    firstName: "",
    LastName: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = await signUpUser(formData);
    setLoading(false);
    if (!data.success) {
      handleError(data.message);
      return;
    }
    Router.push("/login");
  };

  const handleError = (msg: string) => {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 5000);
  };
  return (
    <div className="h-screen flex items-center justify-center p-2 md:px-32 lg:px-52 bg-[#101010]">
      {loading && <Loader />}
      <div className="flex flex-col max-w-lg pb-6 py-6 lg:px-10 p-4 w-5/6 sm:w-4/6 xl:w-3/6  sm:px-4 sm:pb-6 sm:py-4 h-auto justify-center items-center rounded-2xl  bg-[#FFFFFF]">
        {error && <ERRORMSG message={error} />}
        <div className="flex flex-col gap-4 p-12 items-center justify-center">
          <Image
            src="https://monoassets.com/f/118499/x/53bf3c69fd/logo.svg"
            alt="mono-logo"
            className="w-44"
          />
          <p className="text-sm font-light text-[#101010] opacity-70">
            Securely login to your account
          </p>
        </div>

        <form
          className="bg-white w-full px-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full sm:w-1/2 px-3 mb-4 sm:mb-0">
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                onChange={(e) => handleChange(e)}
                name="firstName"
                required
              />
            </div>
            <div className="w-full sm:w-1/2 px-3">
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                onChange={(e) => handleChange(e)}
                name="lastName"
                required
              />
            </div>
          </div>
          <div className="w-full py-4">
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              id="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="w-full py-4">
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
              required
              minLength={5}
            />
          </div>

          <button
            type="submit"
            className="shadow-lg drop-shadow-lg w-full bg-[#182CD1] hover:bg-[#6979F8] my-6 py-3 uppercase text-md rounded-md text-white font-light"
          >
            GET STARTED
          </button>
          <div className="flex w-full font-light justify-center items-center text-[#182CD1]">
            <p className="mt-4 text-xs self-center">
              {" "}
              Already have an account?
              <span className="cursor-pointer text-xs font-light text-[#182CD1] underline">
                {" "}
                <Link href="/login"> Sign in</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
