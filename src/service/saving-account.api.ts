import { baseAuthAPI } from "./base-auth.api";

interface SavingAccountRequest {
  depositId: number;
  balance: number;
  term: number;
}

interface EarlyClosureRequest {
  savingAccountId: number;
  reason: string;
  confirmed: boolean;
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

interface EarlyClosureResponse {
  savingAccountId: number;
  accountNumber: string;
  customerName: string;
  originalBalance: number;
  originalInterestRate: number;
  originalTermMonths: number;
  startDate: string;
  originalMaturityDate: string;
  closureDate: string;
  actualTermDays: number;
  interestEarned: number;
  penaltyRate: number;
  penaltyAmount: number;
  finalAmount: number;
  totalWithdrawal: number;
  projectedInterestIfMatured: number;
  lossFromEarlyClosure: number;
  reason: string;
  processedAt: string;
  processedBy: string;
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
    closeSavingAccountEarly: build.mutation<EarlyClosureResponse, EarlyClosureRequest>({
      query: (body) => ({
        url: `${savingAccountUrl}/close-early`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<EarlyClosureResponse>) => {
        return response.data;
      },
      transformErrorResponse: (response: any) => {
        return response.data || { message: 'Có lỗi xảy ra' };
      },
    }),
  }),
});

export const { 
  useCreateSavingAccountMutation,
  useCloseSavingAccountEarlyMutation 
} = savingAccountApi;

