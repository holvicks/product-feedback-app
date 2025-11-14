
import { useQuery } from "@tanstack/react-query";
import { fetchFeedbacks } from "../utils/api";

export const useFeedbacks = (limit: number = 5) => {
  const {
    data: feedbacks = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["feedbacks", limit],
    queryFn: fetchFeedbacks,
  });

  return {
    feedbacks: feedbacks.slice(0, limit),
    loading,
    error: isError ? (error as Error).message : null,
  };
};