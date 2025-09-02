import { baseAuthAPI } from "./base-auth.api";

export interface CustomerBalance {
  id: number;
  totalBalance: number;
  availableBalance: number;
  savingsBalance: number;
  lastUpdated: string;
}

export interface SavingAccountDetail {
  id: number;
  accountNumber: string;
  depositTypeName: string;
  interestRate: number;
  balance: number;
  term: number;
  startDate: string;
  maturityDate: string;
  status: string;
  approvalStatus: string;
  currentInterest: number;
  projectedAmount: number;
  daysRemaining: number;
}

export interface SavingTransaction {
  id: number;
  savingAccountId: number;
  accountNumber: string;
  transactionType: string;
  amount: number;
  transactionDate: string;
  description: string;
  status: string;
}

export interface AssetAllocation {
  cashAmount: number;
  savingsAmount: number;
  totalAmount: number;
  cashPercentage: number;
  savingsPercentage: number;
}

const customerUrl = "/customer";

export interface Customer {
  id: number;
  fullName: string;
  identityNo?: string;
  cusName?: string;
  cusCode?: string;
  phone?: string;
  email?: string;
  createdAt?: string;
  totalBalance?: number;
}

export const customerApi = baseAuthAPI.injectEndpoints({
  endpoints: (build) => ({
    getCustomerBalance: build.query<CustomerBalance, void>({
      query: () => ({
        url: `${customerUrl}/balance`,
        method: 'GET',
      }),
      transformResponse: (response: { success: boolean; data: CustomerBalance; message: string }) => {
        return response.data;
      },
    }),
    
    getCustomerSavingAccounts: build.query<SavingAccountDetail[], void>({
      query: () => ({
        url: `${customerUrl}/saving-accounts`,
        method: 'GET',
      }),
      transformResponse: (response: { success: boolean; data: SavingAccountDetail[]; message: string }) => {
        return response.data;
      },
    }),
    
    getSavingTransactions: build.query<SavingTransaction[], { limit?: number }>({
      query: ({ limit = 10 }) => ({
        url: `${customerUrl}/saving-transactions?limit=${limit}`,
        method: 'GET',
      }),
      transformResponse: (response: { success: boolean; data: SavingTransaction[]; message: string }) => {
        return response.data;
      },
    }),
    
    getAssetAllocation: build.query<AssetAllocation, void>({
      query: () => ({
        url: `${customerUrl}/asset-allocation`,
        method: 'GET',
      }),
      transformResponse: (response: { success: boolean; data: AssetAllocation; message: string }) => {
        return response.data;
      },
    }),
    
    // Admin endpoint to get all customers
    getAllCustomers: build.query<Customer[], void>({
      query: () => ({
        url: `/admin/customers`,
        method: 'GET',
      }),
      transformResponse: (response: { success: boolean; data: Customer[]; message: string }) => {
        return response.data;
      },
    }),
    
    calculateCurrentInterest: build.mutation<{ currentInterest: number }, { savingAccountId: number }>({
      query: ({ savingAccountId }) => ({
        url: `${customerUrl}/saving-accounts/${savingAccountId}/calculate-interest`,
        method: 'POST',
      }),
    }),
  }),
});

export const { 
  useGetCustomerBalanceQuery,
  useGetCustomerSavingAccountsQuery,
  useGetSavingTransactionsQuery,
  useGetAssetAllocationQuery,
  useGetAllCustomersQuery,
  useCalculateCurrentInterestMutation
} = customerApi;