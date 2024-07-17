import React, { useState, useContext } from "react";
import {
  FaToggleOn,
  FaComment,
  FaUser,
  FaUsers,
  FaMapMarkerAlt,
  FaLock,
  FaLockOpen,
  FaClock,
} from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "../../css/AddUserModal.module.css";
import { ThemeContext } from "../../context/ThemeContext";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: any) => Promise<boolean>;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState("Enable");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState("full");
  const [allowedAddress, setAllowedAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inactivityTimeout, setInactivityTimeout] = useState("10m");
  const [inactivityPolicy, setInactivityPolicy] = useState("none");

  const handleSubmit = async () => {
    if (!name) {
      toast.error("El nombre es requerido", {
        theme: isDarkMode ? "light" : "dark",
      });
      return;
    }
    if (!password) {
      toast.error("La contraseña es requerida", {
        theme: isDarkMode ? "light" : "dark",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden", {
        theme: isDarkMode ? "light" : "dark",
      });
      return;
    }

    const newUser = {
      enabled: enabled === "Enable",
      comment,
      name,
      group,
      allowedAddress,
      password,
      inactivityTimeout,
      inactivityPolicy,
    };

    const success = await onSubmit(newUser);

    if (success) {
      setEnabled("Enable");
      setComment("");
      setName("");
      setGroup("full");
      setAllowedAddress("");
      setPassword("");
      setConfirmPassword("");
      setInactivityTimeout("10m");
      setInactivityPolicy("none");
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.formGroup}>
          <label>
            <FaToggleOn className={styles.icon} /> Habilitado
          </label>
          <select
            title="None"
            value={enabled}
            onChange={(e) => setEnabled(e.target.value)}
          >
            <option value="Enable">Si</option>
            <option value="Disable">No</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>
            <FaComment className={styles.icon} /> Comentario
          </label>
          <textarea
            placeholder="Comentario"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>
            <FaUser className={styles.icon} /> Nombre
          </label>
          <input
            placeholder="Nombre"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>
            <FaUsers className={styles.icon} /> Grupo
          </label>
          <select
            title="none"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value="full">Full</option>
            <option value="read">Read</option>
            <option value="write">Write</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>
            <FaMapMarkerAlt className={styles.icon} /> Dirección permitida
          </label>
          <input
            placeholder="Dirección permitida"
            type="text"
            value={allowedAddress}
            onChange={(e) => setAllowedAddress(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>
            <FaLock className={styles.icon} /> Contraseña
          </label>
          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>
            <FaLockOpen className={styles.icon} /> Confirmar contraseña
          </label>
          <input
            placeholder="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>
            <FaClock className={styles.icon} /> Tiempo de inactividad
          </label>
          <input
            placeholder="10m"
            type="text"
            value={inactivityTimeout}
            onChange={(e) => setInactivityTimeout(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>
            <FaClock className={styles.icon} /> Política de inactividad
          </label>
          <select
            title="None"
            value={inactivityPolicy}
            onChange={(e) => setInactivityPolicy(e.target.value)}
          >
            <option value="none">None</option>
            <option value="lockscreen">Lockscreen</option>
            <option value="logout">Logout</option>
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <div className={styles.buttonLeft}>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
          </div>
          <div className={styles.buttonRight}>
            <button onClick={handleSubmit}>Aplicar</button>
            <button onClick={handleSubmit}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
