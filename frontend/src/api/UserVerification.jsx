import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "./AxiosConfig";

const UserAuthenticated = createContext();

export default function UserVerification({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk memverifikasi user ke Django
  const authUser = useCallback(async () => {
    try {
      const response = await api.get('authenticate/user/');
      setUser(response.data);
    } catch (error) {
      setUser(null);
      console.log("User belum terautentikasi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    authUser();
  }, [authUser]);

  return (
    <UserAuthenticated.Provider value={{ user, setUser, loading, authUser }}>
      {children}
    </UserAuthenticated.Provider>
  );
}

export const useUserAuthenticated = () => {
  const context = useContext(UserAuthenticated);
  if (!context) {
    throw new Error("useUserAuthenticated harus digunakan di dalam UserVerification Provider");
  }
  return context;
};