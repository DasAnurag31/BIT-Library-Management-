import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { authApi } from "../api/axios";

// Define types for user and auth context
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  accessToken: string | null;

  login: (userData: { user: User; accessToken: string }) => void;
  logout: () => void;
  register: (userData: { user: User; accessToken: string }) => void;
}

// Create the Auth context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Function to initialize user from Sessions storage on mount
  const initializeUserFromLocalStorage = () => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  };

  // Use useEffect to run the initialization function on mount
  useEffect(() => {
    initializeUserFromLocalStorage();
  }, []);

  // Function to handle login
  const login = (userData: { user: User; accessToken: string }) => {
    setUser(userData.user);
    setAccessToken(userData.accessToken);
    sessionStorage.setItem("user", JSON.stringify(userData.user));
  };

  const logout = async () => {
    try {
      await authApi.get("/logout");
      setUser(null);
      setAccessToken(null);
      sessionStorage.removeItem("user");
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  const register = (userData: { user: User; accessToken: string }) => {
    setUser(userData.user);
    setAccessToken(userData.accessToken);
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
