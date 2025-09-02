// src/api/supportRequest.api.ts
import { SupportRequest } from "../shared/interface/SupportRequest";
import { baseAuthAPI } from "./base-auth.api";

const supportRequestUrl = "/send-email";

export const supportRequestApi = baseAuthAPI.injectEndpoints({
  endpoints: (build) => ({
    // 1. Lấy tất cả yêu cầu hỗ trợ
    getAllSupportRequests: build.query<SupportRequest[], void>({
      query: () => ({
        url: `${supportRequestUrl}`,
        method: "GET",
      }),
    }),

    // 2. Lấy theo ID
    getSupportRequestById: build.query<SupportRequest, number>({
      query: (id) => ({
        url: `${supportRequestUrl}/${id}`,
        method: "GET",
      }),
    }),

    // 3. Tạo mới yêu cầu
    createSupportRequest: build.mutation<SupportRequest, Partial<SupportRequest>>({
      query: (body) => ({
        url: supportRequestUrl,
        method: "POST",
        body,
      }),
    }),

    // 4. Cập nhật yêu cầu
    updateSupportRequest: build.mutation<SupportRequest, { id: number; data: Partial<SupportRequest> }>({
      query: ({ id, data }) => ({
        url: `${supportRequestUrl}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // 5. Xoá yêu cầu
    deleteSupportRequest: build.mutation<void, number>({
      query: (id) => ({
        url: `${supportRequestUrl}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllSupportRequestsQuery,
  useGetSupportRequestByIdQuery,
  useCreateSupportRequestMutation,
  useUpdateSupportRequestMutation,
  useDeleteSupportRequestMutation,
} = supportRequestApi;

export const {
  endpoints: {
    getAllSupportRequests,
    getSupportRequestById,
    createSupportRequest,
    updateSupportRequest,
    deleteSupportRequest,
  },
} = supportRequestApi;
