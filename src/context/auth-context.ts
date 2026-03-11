import { createContext } from "react";

type User = {
  name: string;
  email: string;
};

export type AuthContextType = {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);