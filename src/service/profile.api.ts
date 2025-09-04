import { baseAuthAPI } from './base-auth.api';

// Types
export interface ProfileResponse {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  identityNo?: string;
  cusCode: string;
  totalBalance: string;
  createdAt: string;
  lastLogin?: string;
  systemSettings: {
    language: string;
    timezone: string;
    currency: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    transactionAlerts: boolean;
    loginAlerts: boolean;
    marketingEmails: boolean;
    theme: string;
    darkMode: boolean;
  };
  securitySettings: {
    twoFactorEnabled: boolean;
    biometricEnabled: boolean;
    sessionTimeout: boolean;
    sessionTimeoutMinutes: number;
    ipWhitelisting: boolean;
    transactionLimits: boolean;
    encryptionStatus: string;
    lastPasswordChange?: string;
    loginAttempts: number;
    accountLocked: boolean;
  };
}

export interface ProfileUpdateRequest {
  fullName: string;
  email: string;
  phone: string;
  identityNo?: string;
}

export interface SystemSettingsRequest {
  language: string;
  timezone: string;
  currency: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  transactionAlerts: boolean;
  loginAlerts: boolean;
  marketingEmails: boolean;
  theme: string;
  darkMode: boolean;
}

export interface SecuritySettingsRequest {
  twoFactorEnabled?: boolean;
  biometricEnabled: boolean;
  sessionTimeout: boolean;
  sessionTimeoutMinutes: number;
  ipWhitelisting: boolean;
  transactionLimits: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface Toggle2FARequest {
  enabled: boolean;
}

// Helper function to get cusCode from token
const getCusCodeFromToken = (): string | null => {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) return null;
    
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    return payload.cusCode || null;
  } catch (error) {
    console.error('Error extracting cusCode from token:', error);
    return null;
  }
};

// API - Inject endpoints into baseAuthAPI
export const profileApi = baseAuthAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get profile
    profile: builder.query<{ success: boolean; message: string; data: ProfileResponse }, void>({
      query: () => {
        const cusCode = getCusCodeFromToken();
        return `/api/profile${cusCode ? `?cusCode=${cusCode}` : ''}`;
      },
      providesTags: ['Profile'],
    }),

    // Update personal information
    updatePersonalInfo: builder.mutation<
      { success: boolean; message: string; data: ProfileResponse },
      ProfileUpdateRequest
    >({
      query: (data) => {
        const cusCode = getCusCodeFromToken();
        return {
          url: `/api/profile/personal${cusCode ? `?cusCode=${cusCode}` : ''}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Profile'],
    }),

    // Update system settings
    updateSystemSettings: builder.mutation<
      { success: boolean; message: string },
      SystemSettingsRequest
    >({
      query: (data) => {
        const cusCode = getCusCodeFromToken();
        return {
          url: `/api/profile/system-settings${cusCode ? `?cusCode=${cusCode}` : ''}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Profile'],
    }),

    // Update security settings
    updateSecuritySettings: builder.mutation<
      { success: boolean; message: string },
      SecuritySettingsRequest
    >({
      query: (data) => {
        const cusCode = getCusCodeFromToken();
        return {
          url: `/api/profile/security-settings${cusCode ? `?cusCode=${cusCode}` : ''}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Profile'],
    }),

    // Change password
    changePassword: builder.mutation<
      { success: boolean; message: string },
      ChangePasswordRequest
    >({
      query: ({ currentPassword, newPassword }) => {
        const cusCode = getCusCodeFromToken();
        return {
          url: `/api/profile/change-password?currentPassword=${encodeURIComponent(currentPassword)}&newPassword=${encodeURIComponent(newPassword)}${cusCode ? `&cusCode=${cusCode}` : ''}`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Profile'],
    }),

    // Toggle 2FA
    toggle2FA: builder.mutation<
      { success: boolean; message: string; data?: string },
      Toggle2FARequest
    >({
      query: ({ enabled }) => {
        const cusCode = getCusCodeFromToken();
        return {
          url: `/api/profile/toggle-2fa?enabled=${enabled}${cusCode ? `&cusCode=${cusCode}` : ''}`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useProfileQuery,
  useUpdatePersonalInfoMutation,
  useUpdateSystemSettingsMutation,
  useUpdateSecuritySettingsMutation,
  useChangePasswordMutation,
  useToggle2FAMutation,
} = profileApi;
