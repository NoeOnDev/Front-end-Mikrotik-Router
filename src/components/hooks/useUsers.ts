// src/hooks/useUsers.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
    name: string;
    comment?: string;
    group: string;
    address?: string;
    "last-logged-in"?: string;
    ".id": string;
}

export const useUsers = (isDarkMode: boolean) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found");
                    return;
                }

                const response = await axios.post(
                    "http://localhost:5000/users",
                    {},
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                if (response.data.status === "OK") {
                    setUsers(response.data.users);
                } else {
                    console.error("Error fetching users:", response.data.message);
                    toast.error(`Error: ${response.data.message}`, {
                        theme: isDarkMode ? "light" : "dark",
                    });
                }
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(`Error: ${error.message}`, {
                        theme: isDarkMode ? "light" : "dark",
                    });
                } else {
                    toast.error("Error desconocido", {
                        theme: isDarkMode ? "light" : "dark",
                    });
                }
            }
        };

        fetchUsers();
    }, [isDarkMode]);

    const addUser = async (user: User) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await axios.post(
                "http://localhost:5000/add_user",
                user,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.status === "OK") {
                toast.success(response.data.message, {
                    theme: isDarkMode ? "light" : "dark",
                });
                setUsers((prevUsers) => [
                    ...prevUsers,
                    { ...user, ".id": response.data.id },
                ]);
            } else {
                console.error("Error adding user:", response.data.message);
                toast.error(`Error: ${response.data.message}`, {
                    theme: isDarkMode ? "light" : "dark",
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error: ${error.message}`, {
                    theme: isDarkMode ? "light" : "dark",
                });
            } else {
                toast.error("Error desconocido", {
                    theme: isDarkMode ? "light" : "dark",
                });
            }
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }

            const data = { id: userId };

            const response = await axios.delete("http://localhost:5000/delete_user", {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                data: data,
            });

            if (response.data.status === "OK") {
                toast.success(response.data.message, {
                    theme: isDarkMode ? "light" : "dark",
                });
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user[".id"] !== userId)
                );
            } else {
                console.error("Error deleting user:", response.data.message);
                toast.error(`Error: ${response.data.message}`, {
                    theme: isDarkMode ? "light" : "dark",
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error: ${error.message}`, {
                    theme: isDarkMode ? "light" : "dark",
                });
            } else {
                toast.error("Error desconocido", {
                    theme: isDarkMode ? "light" : "dark",
                });
            }
        }
    };

    return { users, addUser, deleteUser };
};
