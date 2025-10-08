import { baseAuthAPI } from './base-auth.api';

const monitoringUrl = '/api/transaction-monitoring';

export interface MonitoredSavingAccount {
  // Saving Account Info
  savingAccountId: number;
  accountNumber: string;
  customerName: string;
  cusCode: string;
  identityNo: string;
  depositTypeName: string;
  interestRate: number;
  balance: number;
  term: number;
  startDate: string;
  maturityDate: string;
  accountStatus: string;
  approvalStatus: string;
  
  // Monitoring Info
  monitoringId: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  monitoringReason: string;
  monitoringType: 'AML_RISK' | 'SUSPICIOUS_ACTIVITY' | 'HIGH_VALUE_CUSTOMER' | 'MANUAL_REQUEST';
  monitoringStartDate: string;
  monitoringEndDate?: string;
  isMonitoringActive: boolean;
  notes?: string;
  createdBy: string;
  updatedBy?: string;
  updatedAt?: string;
  
  // Calculated fields
  daysMonitored: number;
  daysRemaining?: number;
  isExpiringSoon: boolean;
}

export interface MonitoringUpdateRequest {
  notes?: string;
}

export interface MonitoringExtendRequest {
  endDate: string;
  reason: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errorCode?: string;
}

export const monitoringApi = baseAuthAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllMonitoredSavingAccounts: build.query<MonitoredSavingAccount[], void>({
      query: () => ({
        url: `${monitoringUrl}/saving-accounts`,
        method: 'GET',
      }),
      providesTags: ['MonitoredAccount'],
    }),
    
    getMonitoredAccountsByRiskLevel: build.query<MonitoredSavingAccount[], string>({
      query: (riskLevel) => ({
        url: `${monitoringUrl}/saving-accounts/by-risk-level/${riskLevel}`,
        method: 'GET',
      }),
      providesTags: ['MonitoredAccount'],
    }),
    
    getExpiringSoonMonitoredAccounts: build.query<MonitoredSavingAccount[], void>({
      query: () => ({
        url: `${monitoringUrl}/saving-accounts/expiring-soon`,
        method: 'GET',
      }),
      providesTags: ['MonitoredAccount'],
    }),
    
    updateMonitoringNotes: build.mutation<{ success: boolean; message: string }, { monitoringId: number; notes: string }>({
      query: ({ monitoringId, notes }) => ({
        url: `${monitoringUrl}/update-notes/${monitoringId}`,
        method: 'PUT',
        body: { notes },
      }),
      invalidatesTags: ['MonitoredAccount'],
    }),
    
    extendMonitoring: build.mutation<{ success: boolean; message: string }, { monitoringId: number; endDate: string; reason: string }>({
      query: ({ monitoringId, endDate, reason }) => ({
        url: `${monitoringUrl}/extend/${monitoringId}`,
        method: 'PUT',
        body: { endDate, reason },
      }),
      invalidatesTags: ['MonitoredAccount'],
    }),
    
    stopMonitoring: build.mutation<{ success: boolean; message: string }, { monitoringId: number; reason: string }>({
      query: ({ monitoringId, reason }) => ({
        url: `${monitoringUrl}/stop/${monitoringId}`,
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: ['MonitoredAccount'],
    }),
    
    getMonitoringStatistics: build.query<any, void>({
      query: () => ({
        url: `${monitoringUrl}/statistics`,
        method: 'GET',
      }),
      providesTags: ['MonitoredAccount'],
    }),
  }),
});

export const {
  useGetAllMonitoredSavingAccountsQuery,
  useGetMonitoredAccountsByRiskLevelQuery,
  useGetExpiringSoonMonitoredAccountsQuery,
  useUpdateMonitoringNotesMutation,
  useExtendMonitoringMutation,
  useStopMonitoringMutation,
  useGetMonitoringStatisticsQuery,
} = monitoringApi;













