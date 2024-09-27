import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface SignupProps {
  number: string;
  displayName: string;
  type: string;
  location: string;
}

const useSignup = () => {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const signup = async ({
    number,
    displayName,
    type,
    location,
  }: SignupProps) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, displayName, type, location }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Account created successfully");
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
