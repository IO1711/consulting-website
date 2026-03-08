import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "./lib/apiClient";

export default function useFetch(baseUrl) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const get = async (url, queryKey = ["legacy-fetch", baseUrl, url]) => {
    setLoading(true);
    try {
      return await queryClient.fetchQuery({
        queryKey,
        queryFn: () => apiRequest(baseUrl, url),
      });
    } finally {
      setLoading(false);
    }
  };

  const post = async (url, body, options = {}) => {
    setLoading(true);
    try {
      return await apiRequest(baseUrl, url, {
        method: "POST",
        body,
        ...options,
      });
    } finally {
      setLoading(false);
    }
  };

  return { get, post, loading };
}
