import React, { useContext, useState } from "react";
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
import { useUsers } from "../hooks/useUsers";
import { LogoutButton } from "../utils/LogoutButton";

export const AddUsersPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users, addUser, deleteUser } = useUsers(isDarkMode);

  const handleAddUser = async (user: any) => {
    try {
      await addUser(user);
      setIsModalOpen(false);
      return true;
    } catch (error) {
      return false;
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
                      onClick={() => deleteUser(user[".id"])}
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
      <LogoutButton />
    </div>
  );
};
