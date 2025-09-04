export interface RegisterRequestBody {
username: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  enabled: boolean;
  credentials: {
    type: string;
    value: string;
    temporary: boolean;
  }[];
  requiredActions: string[];
}