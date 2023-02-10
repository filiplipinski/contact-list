import { useState, useCallback, useEffect } from "react";

import { Person } from "src/types/types";

import apiData from "../../api";

export const useFetchPersonsData = () => {
  const [data, setData] = useState<Person[] | undefined>(undefined);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const newData = await apiData();

      setIsError(false);

      return newData;
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMore = useCallback(async () => {
    const newData = await fetchData();

    if (newData) {
      setData((prevData) => [...(prevData ?? []), ...newData]);
    }
    return newData;
  }, [fetchData]);

  const runQuery = useCallback(() => fetchData().then(setData), [fetchData]);

  useEffect(() => {
    runQuery();
  }, [runQuery]);

  return { data, isLoading, isError, refetch: runQuery, fetchMore };
};
