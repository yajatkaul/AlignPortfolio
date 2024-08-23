"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useVerification from "@/hooks/useVerification";
import { useState } from "react";

const Page = () => {
  const [otp, setOtp] = useState({
    token: "",
  });
  const { loading, verify } = useVerification();
  const handleVerification = (e: any) => {
    e.preventDefault();
    verify(otp);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col" onSubmit={handleVerification}>
        <p className="flex justify-center items-center text-[40px]">Verify</p>
        <div className="flex flex-col justify-center items-center p-4 max-w-[400px] gap-4 rounded-[30px]">
          <InputOTP
            maxLength={6}
            defaultValue={otp.token}
            onChange={(e) => setOtp({ ...otp, token: e })}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <button className="btn w-full">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Page;
