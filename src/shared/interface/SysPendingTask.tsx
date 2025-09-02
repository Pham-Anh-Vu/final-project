export interface SysPendingTask {
  id: number;
  entityId: number;
  identifyId: number;
  menuMappingId: number;
  menuMappingName: string;
  classCallBack: string;
  secretKey: string;
  taskAction: string;
  apprStatus: string;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  deletedBy?: string;
  deletedAt?: string;
  auditNumber?: string;
  orgId?: number;
}
