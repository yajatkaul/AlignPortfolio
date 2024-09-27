import { useState } from "react";
import toast from "react-hot-toast";

const useOTP = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOTP] = useState();
  const getOTP = async (number: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/auth/getotp/${number}`);

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setOTP(data.result);

      toast.success("OTP Sent Successfully");
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getOTP };
};

export default useOTP;
