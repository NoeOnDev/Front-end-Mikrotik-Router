// src/components/hooks/useLogin.ts
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface LoginResponse {
    status: string;
    message: string;
    token?: string;
}

const useLogin = (isDarkMode: boolean) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (ip: string, username: string, password: string): Promise<LoginResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:5000/connect", {
                ip,
                username,
                password,
            });

            if (response.data.status === "OK") {
                toast.success("Conexión exitosa", {
                    theme: isDarkMode ? "light" : "dark",
                });
                return response.data;
            } else {
                toast.error(`Error: ${response.data.message}`, {
                    theme: isDarkMode ? "light" : "dark",
                });
                return null;
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                toast.error(`Error: ${error.message}`, {
                    theme: isDarkMode ? "light" : "dark",
                });
            } else {
                setError("Error desconocido");
                toast.error("Error desconocido", {
                    theme: isDarkMode ? "light" : "dark",
                });
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useLogin;
