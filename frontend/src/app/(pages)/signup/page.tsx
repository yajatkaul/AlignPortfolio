"use client";
import useSignup from "@/hooks/useSignup";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const { loading, signup } = useSignup();
  const [inputs, setInputs] = useState({
    number: "",
    displayName: "",
    type: "",
    location: "",
  });

  const handleSignup = (e: any) => {
    e.preventDefault();
    signup(inputs);
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
        <form className="flex" onSubmit={handleSignup}>
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
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Display Name"
                defaultValue={inputs.displayName}
                onChange={(e) => {
                  setInputs({ ...inputs, displayName: e.target.value });
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                fill="#000000"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="800px"
                height="800px"
                viewBox="0 0 395.71 395.71"
                xmlSpace="preserve"
                className="h-4 w-4 opacity-60"
              >
                <g>
                  <path
                    d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
		c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
		C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
		c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
                  />
                </g>
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Location"
                value={inputs.location}
                onChange={(e) =>
                  setInputs({ ...inputs, location: e.target.value })
                }
              />
            </label>
            <select
              className="select select-bordered w-full"
              onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
            >
              <option disabled selected>
                Type
              </option>
              <option>Interior Designer</option>
              <option>Individual Owner/Consumer</option>
              <option>Architect</option>
              <option>PMC</option>
              <option>Vendor</option>
              <option>Other</option>
            </select>
            <div className="divider"></div>
            <div className="flex justify-start items-start w-full">
              <p
                className="flex cursor-pointer"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Already have an account?
              </p>
            </div>
            <button className="btn w-full">
              {loading ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                "SignUp"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
