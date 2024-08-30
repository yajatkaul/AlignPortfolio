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

interface FilterContextType {
  filters: any | null;
  setFilters: Dispatch<SetStateAction<any | null>>;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

export const useFilterContext = () => {
  return useContext(FilterContext);
};

interface FilterContextProviderProps {
  children: ReactNode;
}

export const FilterContextProvider = ({
  children,
}: FilterContextProviderProps) => {
  const [filters, setFilters] = useState<any | null>(
    localStorage.getItem("Filters") || null
  );

  useEffect(() => {
    const tags = localStorage.getItem("Filters");
    const typesArray = tags?.split(",").filter((type) => type.trim() !== "");
    setFilters(typesArray);
  }, []);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
