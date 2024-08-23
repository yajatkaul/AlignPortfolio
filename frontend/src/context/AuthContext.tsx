"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface AuthContextType {
  authUser: any | null;
  setAuthUser: Dispatch<SetStateAction<any | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<any | null>(null);

  useEffect(() => {
    // @ts-expect-error
    const storedUser = JSON.parse(localStorage.getItem("Auth"));
    if (storedUser?.details) {
      setAuthUser(storedUser.details);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
