import { useKeycloak } from "@react-keycloak/web";

const useAuthStatus = () => {
  const { keycloak } = useKeycloak();

  const isInitialized = keycloak?.token !== undefined; // Đảm bảo init xong
  const isAuthenticated = keycloak?.authenticated === true;

  const token = keycloak?.token;

  return { isAuthenticated, token, keycloak, isInitialized };
};

export default useAuthStatus;
