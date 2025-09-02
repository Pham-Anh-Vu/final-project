import { ApprovalRequest } from "../shared/interface/ApprovalRequest";
import { baseAuthAPI } from "./base-auth.api";

const approvalUrl = "/approval";

export const approvalApi = baseAuthAPI.injectEndpoints({
  endpoints: (build) => ({
    approveEntity: build.mutation<string, ApprovalRequest>({
      query: (body) => ({
        url: `${approvalUrl}/approve`,
        method: "POST",
        body,
      }),
    }),
    cancelEntity: build.mutation<string, ApprovalRequest>({
      query: (body) => ({
        url: `${approvalUrl}/cancel`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useApproveEntityMutation,
  useCancelEntityMutation,
} = approvalApi;

export const {
  endpoints: { approveEntity, cancelEntity },
} = approvalApi;