import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  FaTrash,
  FaComment,
  FaUser,
  FaUsers,
  FaMapMarkerAlt,
  FaClock,
  FaPlus,
} from "react-icons/fa";
import styles from "../../css/AddUsersPage.module.css";
import { ThemeToggleButton } from "../utils/ThemeToggleButton";
import { ThemeContext } from "../../context/ThemeContext";
import { AddUserModal } from "../utils/AddUserModal";

interface User {
  name: string;
  comment?: string;
  group: string;
  address?: string;
  "last-logged-in"?: string;
  ".id": string;
}

export const AddUsersPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = (user: any) => {
    console.log(user);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/users/delete",
        { user_id: userId },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "OK") {
        setUsers(users.filter((user) => user[".id"] !== userId));
      } else {
        console.error("Error deleting user:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.themeToggleButton}>
        <ThemeToggleButton onClick={toggleTheme} isDarkMode={isDarkMode} />
      </div>
      <div className={styles.userManagement}>
        <div className={styles.header}>
          <button
            type="button"
            className={styles.addButton}
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus className={styles.icon} /> Agregar nuevo usuario
          </button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th></th>
                <th>
                  <FaComment className={styles.icon} /> Comentario
                </th>
                <th>
                  <FaUser className={styles.icon} /> Nombre
                </th>
                <th>
                  <FaUsers className={styles.icon} /> Grupo
                </th>
                <th>
                  <FaMapMarkerAlt className={styles.icon} /> Dirección permitida
                </th>
                <th>
                  <FaClock className={styles.icon} /> Último inicio de sesión
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.name}>
                  <td>
                    <button
                      type="button"
                      aria-label="Eliminar usuario"
                      className={styles.deleteButton}
                      onClick={() => handleDeleteUser(user[".id"])}
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td>{user.comment}</td>
                  <td>{user.name}</td>
                  <td>{user.group}</td>
                  <td>{user.address}</td>
                  <td>{user["last-logged-in"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
};
