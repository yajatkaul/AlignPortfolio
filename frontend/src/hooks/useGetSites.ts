import { useFilterContext } from "@/context/FilterContext";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetSites = () => {
  const [sites, setSites] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPageB] = useState(1);
  // @ts-expect-error
  const { filters, setFilters } = useFilterContext();

  const limit = 15;

  const buildFilterQuery = useCallback(() => {
    const query = new URLSearchParams();

    if (filters && filters.length > 0) query.append("types", filters.join(","));

    return query.toString();
  }, [filters]);

  const updateFilterB = () => {
    if (!filters) {
      setFilters([]);
    }

    setPageB(1);
    setSites([]);
    setHasMore(true);
  };

  useEffect(() => {
    const getSites = async () => {
      if (!hasMore) return;

      try {
        const query = buildFilterQuery();

        const url =
          query === "types=null"
            ? `/api/data/getSites?page=${page}&limit=${limit}`
            : `/api/data/getSites?page=${page}&limit=${limit}&${query}`;

        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (res.status !== 200) {
          throw new Error(data.error || "Failed to fetch sites.");
        }

        setSites((prevData) => (page === 1 ? data : [...prevData, ...data]));

        if (data.length < limit) {
          setHasMore(false);
        }
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    getSites();
  }, [page, buildFilterQuery, hasMore]); // Added `hasMore` to dependencies to prevent unnecessary calls

  return { sites, setPageB, updateFilterB };
};

export default useGetSites;
