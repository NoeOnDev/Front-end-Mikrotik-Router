import React, { useContext } from "react";
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

export const AddUsersPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={styles.container}>
      <div className={styles.themeToggleButton}>
        <ThemeToggleButton onClick={toggleTheme} isDarkMode={isDarkMode} />
      </div>
      <div className={styles.userManagement}>
        <div className={styles.header}>
          <button type="button" className={styles.addButton}>
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
              <tr>
                <td>
                  <button
                    type="button"
                    aria-label="Eliminar usuario"
                    className={styles.deleteButton}
                  >
                    <FaTrash />
                  </button>
                </td>
                <td>system default user</td>
                <td>admin</td>
                <td>full</td>
                <td></td>
                <td>2024-07-15 02:04:46</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
