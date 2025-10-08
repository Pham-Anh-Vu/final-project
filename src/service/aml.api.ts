import { baseAuthAPI } from './base-auth.api';

const amlUrl = '/aml';

export interface AmlRecord {
  id?: number;
  fullName: string;
  identityNo?: string;
  phone?: string;
  email?: string;
  reason: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  isActive?: boolean;
  expiresAt?: string;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface AmlRecordCreateRequest {
  fullName: string;
  identityNo?: string;
  phone?: string;
  email?: string;
  reason: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  expiresAt?: string;
}

export interface AmlRecordUpdateRequest {
  id: number;
  reason?: string;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  isActive?: boolean;
  expiresAt?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errorCode?: string;
}

export const amlApi = baseAuthAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllAmlRecords: build.query<AmlRecord[], void>({
      query: () => ({
        url: `${amlUrl}/records`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<AmlRecord[]>) => {
        return response.data;
      },
      providesTags: ['AmlRecord'],
    }),
    
    createAmlRecord: build.mutation<AmlRecord, AmlRecordCreateRequest>({
      query: (data) => ({
        url: `${amlUrl}/records`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: ApiResponse<AmlRecord>) => {
        return response.data;
      },
      invalidatesTags: ['AmlRecord'],
    }),
    
    updateAmlRecord: build.mutation<AmlRecord, AmlRecordUpdateRequest>({
      query: (data) => ({
        url: `${amlUrl}/records`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: ApiResponse<AmlRecord>) => {
        return response.data;
      },
      invalidatesTags: ['AmlRecord'],
    }),
    
    deactivateAmlRecord: build.mutation<string, number>({
      query: (id) => ({
        url: `${amlUrl}/records/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse<string>) => {
        return response.data;
      },
      invalidatesTags: ['AmlRecord'],
    }),
    
    cleanupExpiredRecords: build.mutation<string, void>({
      query: () => ({
        url: `${amlUrl}/cleanup-expired`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<string>) => {
        return response.data;
      },
      invalidatesTags: ['AmlRecord'],
    }),
  }),
});

export const {
  useGetAllAmlRecordsQuery,
  useCreateAmlRecordMutation,
  useUpdateAmlRecordMutation,
  useDeactivateAmlRecordMutation,
  useCleanupExpiredRecordsMutation,
} = amlApi;













