import { baseAuthAPI } from "./base-auth.api";

interface SavingAccountRequest {
  depositId: number;
  balance: number;
  term: number;
}

interface SavingAccountResponse {
  id: number;
  accountNumber: string;
  customerName: string;
  cusCode: string;
  depositTypeName: string;
  interestRate: number;
  balance: number;
  term: number;
  startDate: string;
  maturityDate: string;
  status: string;
  approvalStatus: string;
  expectedAmount: number;
  createdAt: string;
  message: string;
  success: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode?: string;
}

const savingAccountUrl = "/saving-account";

export const savingAccountApi = baseAuthAPI.injectEndpoints({
  endpoints: (build) => ({
    createSavingAccount: build.mutation<SavingAccountResponse, SavingAccountRequest>({
      query: (body) => ({
        url: `${savingAccountUrl}/create`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<SavingAccountResponse>) => {
        return response.data;
      },
      transformErrorResponse: (response: any) => {
        return response.data || { message: 'Có lỗi xảy ra' };
      },
    }),
  }),
});

export const { useCreateSavingAccountMutation } = savingAccountApi;

