import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useRedirectFromUrl = (defaultTo = '/') => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return useCallback(() => {
    navigate(searchParams.get('redirect') ?? defaultTo);
  }, [searchParams, defaultTo, navigate]);
};
