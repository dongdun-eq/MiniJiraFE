import { useSearchParams } from "react-router-dom";
import type { TaskQueryParam } from "../types/task.type";
import { useMemo } from "react";

const useTaskFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsString = searchParams.toString();

  const params = useMemo(
    () => Object.fromEntries(searchParams.entries()) as TaskQueryParam,
    [paramsString], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const setParams = (newParams: TaskQueryParam) => {
    const cleanParams = { ...params, ...newParams } as TaskQueryParam;
    Object.keys(cleanParams).forEach((key) => {
      const objectKey = key as keyof TaskQueryParam;
      if (cleanParams[objectKey] === undefined || cleanParams[objectKey] === "")
        delete cleanParams[objectKey];
    });

    setSearchParams(cleanParams as Record<string, string>);
  };

  return { params, setParams };
};

export default useTaskFilters;
