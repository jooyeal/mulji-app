import React, { useEffect, useState } from "react";
import { ApiClient } from "../services/apiClient";

type QueryType = { path: string; params?: object };

export default function useQuery({ path, params }: QueryType) {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const apiClient = new ApiClient();
      const res = await apiClient.GET({ path, params });
      if (res.status === "success") {
        setError(undefined);
        setData(res.data);
      } else {
        setError(res.message);
      }
    })();
  }, []);

  return { data, error };
}
