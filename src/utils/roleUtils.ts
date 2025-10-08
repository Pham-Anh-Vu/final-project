import { useAppSelector } from '../hooks/hooks';

// Định nghĩa các role constants - theo hệ thống thực tế
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN', 
  GDV: 'GDV',     // Giám đốc vùng
  KSV: 'KSV',     // Kinh doanh vùng
  // Thêm các role khác nếu cần
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Interface cho user info
export interface CurrentUserInfo {
  id?: string;
  username?: string;
  fullName?: string;
  email?: string;
  roles: string[];
}

// Utility function để parse JWT token và lấy user info
export const getCurrentUserInfo = (accessToken: string | null): CurrentUserInfo | null => {
  if (!accessToken) return null;
  
  try {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    return {
      id: payload?.customerId || payload?.sub,
      username: payload?.preferred_username || payload?.sub,
      fullName: payload?.name || payload?.given_name,
      email: payload?.email,
      roles: payload?.realm_access?.roles || []
    };
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
};

// Hook để lấy user info
export const useCurrentUser = (): CurrentUserInfo | null => {
  const auth = useAppSelector((state) => state.auth);
  return getCurrentUserInfo(auth.accessToken);
};

// Kiểm tra xem user có role cụ thể không
export const hasRole = (userRoles: string[], requiredRole: string): boolean => {
  return userRoles.includes(requiredRole);
};

// Kiểm tra xem user có bất kỳ role nào trong danh sách không
export const hasAnyRole = (userRoles: string[], requiredRoles: string[]): boolean => {
  return requiredRoles.some(role => userRoles.includes(role));
};

// Kiểm tra xem user có phải là user thường không
export const isRegularUser = (userRoles: string[]): boolean => {
  // User thường chỉ có role USER, hoặc không có role đặc biệt nào khác
  return userRoles.length === 0 || 
         (userRoles.length === 1 && userRoles.includes(USER_ROLES.USER)) ||
         !hasAnyRole(userRoles, [USER_ROLES.ADMIN, USER_ROLES.GDV, USER_ROLES.KSV]);
};

// Kiểm tra xem user có quyền admin/privileged không
export const isPrivilegedUser = (userRoles: string[]): boolean => {
  return hasAnyRole(userRoles, [USER_ROLES.ADMIN, USER_ROLES.GDV, USER_ROLES.KSV]);
};

// Định nghĩa quyền truy cập menu items
export const MENU_PERMISSIONS = {
  // Menu items cho user thường
  DASHBOARD: 'dashboard',
  BILLING: 'billing', 
  DEPOSITS: 'deposits', // Tiền gửi
  PROFILE: 'profile',
  LOGOUT: 'logout',
  
  // Menu items chỉ cho privileged users
  CUSTOMERS: 'customers', // Khách hàng
  INTEREST_PACKAGES: 'interest-packages', // Gói lãi suất
  PENDING_TASKS: 'pending-tasks', // Tác vụ chờ duyệt
  AML_MANAGEMENT: 'aml-management', // Quản lý AML
  MONITORING_MANAGEMENT: 'monitoring-management', // Quản lý giám sát
  
  // Menu items bị ẩn cho tất cả
  RTL: 'rtl',
  ENCRYPTION_DEMO: 'encryption-demo'
} as const;

// Lấy danh sách menu items được phép cho user
export const getAllowedMenuItems = (userRoles: string[]): string[] => {
  const isRegular = isRegularUser(userRoles);
  
  if (isRegular) {
    // User thường chỉ thấy: Dashboard, Billing, Tiền gửi, Profile, Log Out
    return [
      MENU_PERMISSIONS.DASHBOARD,
      MENU_PERMISSIONS.BILLING,
      MENU_PERMISSIONS.DEPOSITS,
      MENU_PERMISSIONS.PROFILE,
      MENU_PERMISSIONS.LOGOUT
    ];
  } else {
    // Các role khác thấy tất cả trừ RTL và Demo Mã Hóa
    return [
      MENU_PERMISSIONS.DASHBOARD,
      MENU_PERMISSIONS.CUSTOMERS,
      MENU_PERMISSIONS.BILLING,
      MENU_PERMISSIONS.INTEREST_PACKAGES,
      MENU_PERMISSIONS.DEPOSITS,
      MENU_PERMISSIONS.PENDING_TASKS,
      MENU_PERMISSIONS.AML_MANAGEMENT,
      MENU_PERMISSIONS.MONITORING_MANAGEMENT,
      MENU_PERMISSIONS.PROFILE,
      MENU_PERMISSIONS.LOGOUT
      // RTL và ENCRYPTION_DEMO bị loại trừ
    ];
  }
};

// Kiểm tra quyền truy cập menu item
export const canAccessMenuItem = (userRoles: string[], menuItem: string): boolean => {
  const allowedItems = getAllowedMenuItems(userRoles);
  return allowedItems.includes(menuItem);
};
