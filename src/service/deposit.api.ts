import { Deposit } from "../shared/interface/Deposit";
import { baseAuthAPI } from "./base-auth.api";

const depositUrl = "/deposits";

export const depositApi = baseAuthAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllDeposit: build.query<Deposit[], void>({
      query: () => ({
        url: `${depositUrl}`,
        method: "GET",
      }),
    }),
// 2. Lấy theo id
    getDepositById: build.query<Deposit, number>({
      query: (id) => ({
        url: `${depositUrl}/${id}`,
        method: "GET",
      }),
    }),

    // 3. Tạo mới
    createDeposit: build.mutation<Deposit, Partial<Deposit>>({
      query: (body) => ({
        url: depositUrl,
        method: "POST",
        body,
      }),
    }),

    // 4. Cập nhật
    updateDeposit: build.mutation<Deposit, { id: number; data: Partial<Deposit> }>({
      query: ({ id, data }) => ({
        url: `${depositUrl}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // 5. Xoá
    deleteDeposit: build.mutation<void, number>({
      query: (id) => ({
        url: `${depositUrl}/${id}`,
        method: "DELETE",
      }),
    }),
  }),

});

export const { useGetAllDepositQuery, useGetDepositByIdQuery, useCreateDepositMutation, useUpdateDepositMutation, useDeleteDepositMutation } = depositApi;

export const {
  endpoints: { getAllDeposit, getDepositById, createDeposit, updateDeposit, deleteDeposit },
} = depositApi;
