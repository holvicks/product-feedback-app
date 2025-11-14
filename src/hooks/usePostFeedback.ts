import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { postFeedack } from "../utils/api";
import { postFeedback } from "../utils/api";

export const usePostFeedback = () => {
  const queryClient = useQueryClient();

  const {
    mutate: submitFeedback,
    isPending: submitting,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (newFeedback: postFeedack) => postFeedback(newFeedback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });

  return {
    submitFeedback,
    submitting,
    error: isError ? (error as Error).message : null,
    isSuccess,
  };
};
