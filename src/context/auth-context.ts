import { createContext } from "react";

export type User = {
  name: string;
  email: string;
};

export type AuthContextType = {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);