import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "../../css/AddUserModal.module.css";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: any) => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [enabled, setEnabled] = useState("Enable");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState("full");
  const [allowedAddress, setAllowedAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inactivityTimeout, setInactivityTimeout] = useState("00:10:00");
  const [inactivityPolicy, setInactivityPolicy] = useState("None");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
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
    onSubmit(newUser);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.formGroup}>
          <label>Habilitado</label>
          <select
            title="None"
            value={enabled}
            onChange={(e) => setEnabled(e.target.value)}
          >
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Comentario</label>
          <textarea
            placeholder="Comentario"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Nombre</label>
          <input
            placeholder="Nombre"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Grupo</label>
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
          <label>Dirección permitida</label>
          <input
            placeholder="Dirección permitida"
            type="text"
            value={allowedAddress}
            onChange={(e) => setAllowedAddress(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Contraseña</label>
          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Confirmar contraseña</label>
          <input
            placeholder="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Tiempo de inactividad</label>
          <input
            placeholder="00:10:00"
            type="text"
            value={inactivityTimeout}
            onChange={(e) => setInactivityTimeout(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Política de inactividad</label>
          <select
            title="None"
            value={inactivityPolicy}
            onChange={(e) => setInactivityPolicy(e.target.value)}
          >
            <option value="None">None</option>
            <option value="Lockscreen">Lockscreen</option>
            <option value="Logout">Logout</option>
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
