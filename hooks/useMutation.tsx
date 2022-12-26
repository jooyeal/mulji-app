import React, { useEffect } from "react";
import { ApiClient } from "../services/apiClient";

export default function useMutation() {
  const mutate = async ({
    path,
    data,
    onSuccess,
    onError,
  }: {
    path: string;
    data: any;
    onSuccess?: () => void;
    onError?: (e: string) => void;
  }) => {
    const apiClinet = new ApiClient();
    const res = await apiClinet.POST<typeof data>({ path, data });
    if (res.status === "success") {
      onSuccess && onSuccess();
    } else {
      onError && onError(res.message);
    }
  };
  return { mutate };
}
