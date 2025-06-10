import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "Digital-Bank",
  clientId: "bank-app",
});

export default keycloak;