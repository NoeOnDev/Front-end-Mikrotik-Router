// src/components/utils/LogoutButton.tsx
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import styles from "../../css/LogoutButton.module.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      <FaSignOutAlt className={styles.icon} /> Cerrar sesión
    </button>
  );
};
