import { baseAuthAPI } from "./base-auth.api";
import { SysPendingTask } from "../shared/interface/SysPendingTask";

const sysPendingTaskUrl = "/sys-pending-task";

export const sysPendingTaskApi = baseAuthAPI.injectEndpoints({
  endpoints: (build) => ({
    // Lấy tất cả
    getAllSysPendingTasks: build.query<SysPendingTask[], void>({
      query: () => ({
        url: sysPendingTaskUrl,
        method: "GET",
      }),
    }),

    // Tạo mới
    createSysPendingTask: build.mutation<SysPendingTask, Partial<SysPendingTask>>({
      query: (body) => ({
        url: sysPendingTaskUrl,
        method: "POST",
        body,
      }),
    }),

    // Cập nhật
    updateSysPendingTask: build.mutation<SysPendingTask, { id: number; data: Partial<SysPendingTask> }>({
      query: ({ id, data }) => ({
        url: `${sysPendingTaskUrl}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSysPendingTasksQuery,
  useCreateSysPendingTaskMutation,
  useUpdateSysPendingTaskMutation,
} = sysPendingTaskApi;
