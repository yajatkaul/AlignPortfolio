"use client";
import useOTP from "@/hooks/useGetOTP";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const { loading, login } = useLogin();
  const { getOTP } = useOTP();
  const [inputs, setInputs] = useState({
    number: "",
    password: "",
  });
  const handleLogin = (e: any) => {
    e.preventDefault();
    login(inputs);
  };

  //@ts-expect-error
  const OTPGen = (number) => {
    if (!inputs.number) {
      return toast.error("Enter a valid phone number");
    }

    getOTP(number);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/bg.jpg')] bg-fixed bg-no-repeat bg-cover">
      <div className="flex">
        <div>
          <img
            src="/authImage.png"
            alt="image"
            className="max-h-[600px] rounded-l-[30px] hidden md:flex min-h-[500px] object-cover"
          />
        </div>
        <form className="flex" onSubmit={handleLogin}>
          <div className="flex flex-col justify-center items-center p-4 max-w-[400px] gap-4 rounded-[30px] md:rounded-none md:rounded-r-[30px] bg-[#E0D7CF]">
            <img src="/Logo.png" className="w-[250px]" />
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                fill="currentColor"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 891.024 891.024"
                xmlSpace="preserve"
                className="h-4 w-4 opacity-70"
              >
                <g>
                  <path
                    d="M2.8,180.875c46.6,134,144.7,286.2,282.9,424.399c138.2,138.2,290.4,236.301,424.4,282.9c18.2,6.3,38.3,1.8,52-11.8
		l92.7-92.7l21.6-21.6c19.5-19.5,19.5-51.2,0-70.7l-143.5-143.4c-19.5-19.5-51.2-19.5-70.7,0l-38.899,38.9
		c-20.2,20.2-52.4,22.2-75,4.6c-44.7-34.8-89-73.899-131.9-116.8c-42.9-42.9-82-87.2-116.8-131.9c-17.601-22.6-15.601-54.7,4.6-75
		l38.9-38.9c19.5-19.5,19.5-51.2,0-70.7l-143.5-143.5c-19.5-19.5-51.2-19.5-70.7,0l-21.6,21.6l-92.7,92.7
		C1,142.575-3.5,162.675,2.8,180.875z"
                  />
                </g>
              </svg>
              <input
                type="number"
                className="grow"
                placeholder="Phone Number"
                defaultValue={inputs.number}
                onChange={(e) => {
                  setInputs({ ...inputs, number: e.target.value });
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="number"
                className="grow"
                placeholder="OTP"
                defaultValue={inputs.password}
                onChange={(e) => {
                  setInputs({ ...inputs, password: e.target.value });
                }}
              />
              <p
                className="cursor-pointer"
                onClick={() => {
                  OTPGen(inputs.number);
                }}
              >
                Get OTP
              </p>
            </label>
            <div className="divider"></div>
            <div className="flex justify-start items-start w-full">
              <p
                className="flex cursor-pointer"
                onClick={() => {
                  router.push("/signup");
                }}
              >
                {"Don't have an account?"}
              </p>
            </div>

            <button className="btn w-full">
              {loading ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
