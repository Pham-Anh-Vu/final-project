export interface SupportRequest {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  type: string;
  priority: string;
  content: string;
  createdAt?: string;
}