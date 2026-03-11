import { useContext } from "react";
import { AuthContext } from "./auth-context";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    return {
      user: null,
      login: () => {},
      logout: () => {}
    };
  }

  return context;
}