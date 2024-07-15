import React, { useState } from "react";
import styles from "../../css/loginStyles.module.css";
import logo from "../../assets/logo-black.svg";
import {
  FaNetworkWired,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export const LoginPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img src={logo} alt="MikroTik" />
        </div>
        <p>
          Bienvenido al portal de acceso del enrutador MikroTik. Por favor,
          ingrese sus credenciales para administrar el dispositivo. Si no posee
          las credenciales o el dispositivo no le pertenece, contacte a su
          administrador de red.
        </p>
        <form className={styles.formLogin}>
          <div className={styles.inputContainer}>
            <FaNetworkWired className={styles.inputIcon} />
            <input
              type="text"
              name="connect"
              className={styles.inputField}
              placeholder="Conectar a (IP/DNS)"
            />
          </div>
          <div className={styles.inputContainer}>
            <FaUser className={styles.inputIcon} />
            <input
              type="text"
              name="login"
              className={styles.inputField}
              placeholder="Acceso (Nombre)"
            />
          </div>
          <div className={styles.inputContainer}>
            <FaLock className={styles.inputIcon} />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className={styles.inputField}
              placeholder="Contraseña"
            />
            <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button type="submit" className={styles.loginButton}>
            Conectar
          </button>
        </form>
        <div className={styles.links}>
          <a href="#">Winbox</a>
          <a href="#">Graphs</a>
          <a href="#">License</a>
          <a href="https://help.mikrotik.com/docs/">Help</a>
        </div>
      </div>
    </div>
  );
};
