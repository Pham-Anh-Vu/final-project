export interface Deposit {
  id: number;
  code: string;
  name: string;
  description?: string;
  interestRate: number;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
  approvedAt?: Date;
  approvedBy?: string;
  auditNumber?: string;
  orgId?: number;
  action?: string;
  apprStatus?: string;
}
