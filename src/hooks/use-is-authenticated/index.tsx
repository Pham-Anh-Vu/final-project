// hooks/useAuthStatus.ts
import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";

/**
 * Hook kiểm tra đăng nhập, trả về trạng thái đăng nhập và token hiện tại
 */
const useAuthStatus = () => {
  const { keycloak } = useKeycloak();

  const isAuthenticated = keycloak?.authenticated ?? false;
  const token = keycloak?.token ?? null;
  
  return {
    isAuthenticated,
    token,
    keycloak,
  };
};

export default useAuthStatus;
