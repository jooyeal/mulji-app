import { useEffect, useState } from "react";
import { ApiClient } from "../services/apiClient";

type QueryType = {
  path: string;
  params?: object;
  asyncParams?: {
    [key: string]: () => Promise<string | null>;
  };
};

export default function useQuery<T = any>({
  path,
  params,
  asyncParams,
}: QueryType) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (!asyncParams) {
        const apiClient = new ApiClient();
        const res = await apiClient.GET<T>({ path, params });
        if (res.status === "success") {
          setError(undefined);
          setData(res.data);
        } else {
          setError(res.message);
        }
      } else {
        let params: { [key: string]: any } = {};
        await Promise.all(
          Object.keys(asyncParams).map(async (k) => {
            const value = await asyncParams[k]();
            params[k] = value;
          })
        );
        const apiClient = new ApiClient();
        const res = await apiClient.GET<T>({ path, params });
        if (res.status === "success") {
          setError(undefined);
          setData(res.data);
        } else {
          setError(res.message);
        }
      }
      setIsLoading(false);
    })();
  }, [fetchTrigger]);

  const refetch = () => setFetchTrigger((prev) => !prev);

  return { data, error, isLoading, refetch };
}
