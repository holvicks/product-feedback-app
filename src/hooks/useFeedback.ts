import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProductComments, createComment, fetchProductRequestIds } from '../utils/api';
import type { Comment } from '../types';

// Default productId fallback from .env, used if URL or list doesn't provide one
const DEFAULT_PRODUCT_ID = import.meta.env.VITE_DEFAULT_PRODUCT_ID;

// Query for all feedback/product requests
export const useFeedback = () => {
  const { data: productIds } = useQuery<string[]>({
    queryKey: ['product-ids'],
    queryFn: fetchProductRequestIds,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const urlPid = (() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const pidParam = params.get('pid');
      return pidParam ?? undefined;
    } catch {
      return undefined;
    }
  })();

  const candidatePid = urlPid ?? DEFAULT_PRODUCT_ID;
  const resolvedPid = Array.isArray(productIds) && productIds.length > 0
    ? (productIds.includes(String(candidatePid)) ? String(candidatePid) : String(productIds[0]))
    : candidatePid;

  return useQuery<Comment[]>({
    queryKey: ['comments', resolvedPid],
    queryFn: () => fetchProductComments(String(resolvedPid)),
    enabled: !!resolvedPid,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

// Query for comments of a specific product
export const useProductFeedback = (
  productId: string,
  params?: { page?: number; limit?: number }
) =>
  useQuery<Comment[]>({
    queryKey: ['comments', productId, params?.page ?? 1, params?.limit ?? 20],
    queryFn: () => fetchProductComments(productId, params),
    enabled: !!productId,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

// Mutation to create a comment and refresh feedback list
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onSuccess: (_data, variables) => {
      const pid = (variables as { productId?: string })?.productId;
      if (pid) {
        queryClient.invalidateQueries({ queryKey: ['comments', pid] });
      }
    },
  });
};