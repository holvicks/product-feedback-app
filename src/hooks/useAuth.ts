import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../utils/api';

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const token =
        (data && (data.token || data.accessToken || data.jwt)) ||
        (data?.data && (data.data.token || data.data.accessToken || data.data.jwt));

      if (token) {
        localStorage.setItem('token', token);
        console.log('[auth] saved token to localStorage:', String(token).slice(-10));
        queryClient.invalidateQueries({ queryKey: ['feedback'] });
      } else {
        console.warn('[auth] login succeeded, but no token field was found');
      }
    },
  });
};