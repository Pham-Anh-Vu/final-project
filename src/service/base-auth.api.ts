import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const ACCESS_TOKEN_KEY = 'access_token';

const baseAuthQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8081',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// KHÔNG dispatch logout ở đây nữa, chỉ trả về lỗi
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseAuthQuery(args, api, extraOptions);
  return result;
};

const baseAuthQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 1 });

export const baseAuthAPI = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseAuthQueryWithRetry,
  tagTypes: ['UserCompany', 'Bank', 'Counter'],
  endpoints: () => ({}),
});
